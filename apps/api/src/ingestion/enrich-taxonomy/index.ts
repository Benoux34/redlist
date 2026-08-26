import { db } from "@/db";
import { matchTaxon } from "@/sources";
import { sleep } from "../utils";
import {
  BATCH_SIZE,
  CONCURRENCY,
  CONSECUTIVE_FAILURE_LIMIT,
  DELAY_BETWEEN_SLICES_MS,
} from "./utils";

let stopRequested = false;

process.on("SIGINT", () => {
  console.log("\nStopping after the current batch...");
  stopRequested = true;
});

type Row = {
  assessmentId: number;
  scientificName: string;
};

async function enrichOne(row: Row): Promise<boolean | null> {
  try {
    const match = await matchTaxon(row.scientificName);

    await db.redListAssessment.update({
      where: { assessmentId: row.assessmentId },
      data: {
        gbifUsageKey: match?.usageKey ?? null,
        kingdom: match?.kingdom ?? null,
        phylum: match?.phylum ?? null,
        className: match?.class ?? null,
        order: match?.order ?? null,
        family: match?.family ?? null,
        taxonomyFetchedAt: new Date(),
      },
    });

    return match !== null;
  } catch (error) {
    console.error(`  ${row.scientificName}:`, error);
    return null;
  }
}

async function runEnrichTaxonomy(): Promise<void> {
  const where = { taxonomyFetchedAt: null };

  const remaining = await db.redListAssessment.count({ where });
  console.log(`${remaining} species to enrich`);

  const startedAt = Date.now();
  let processed = 0;
  let matched = 0;
  let consecutiveFailures = 0;

  while (!stopRequested) {
    const rows: Row[] = await db.redListAssessment.findMany({
      where,
      select: { assessmentId: true, scientificName: true },
      take: BATCH_SIZE,
    });

    if (rows.length === 0) break;

    for (let i = 0; i < rows.length && !stopRequested; i += CONCURRENCY) {
      const slice = rows.slice(i, i + CONCURRENCY);
      const results = await Promise.all(slice.map(enrichOne));

      for (const result of results) {
        processed += 1;

        if (result === null) {
          consecutiveFailures += 1;
        } else {
          consecutiveFailures = 0;
          if (result) matched += 1;
        }
      }

      if (consecutiveFailures >= CONSECUTIVE_FAILURE_LIMIT) {
        console.error(`\nAborted: ${consecutiveFailures} consecutive errors.`);
        return;
      }

      await sleep(DELAY_BETWEEN_SLICES_MS);
    }

    const rate = processed / (Date.now() - startedAt);
    const etaMin = Math.round((remaining - processed) / rate / 60_000);

    console.log(
      `${processed}/${remaining} · ${matched} matched · eta ${etaMin}m`,
    );
  }

  console.log("Done.");
}

export { runEnrichTaxonomy, enrichOne };
