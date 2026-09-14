import { db } from "@/db";
import { fetchFrenchVernacularName } from "@/sources";
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
  gbifUsageKey: number;
};

async function enrichOne(row: Row): Promise<boolean | null> {
  try {
    const name = await fetchFrenchVernacularName(row.gbifUsageKey);

    await db.redListAssessment.update({
      where: { assessmentId: row.assessmentId },
      data: {
        ...(name === null ? {} : { vernacularNameFr: name }),
        vernacularFetchedAt: new Date(),
      },
    });

    return name !== null;
  } catch (error) {
    console.error(`  ${row.assessmentId}:`, error);
    return null;
  }
}

async function runEnrichVernacular(): Promise<void> {
  const where = {
    vernacularFetchedAt: null,
    vernacularNameFr: null,
    gbifUsageKey: { not: null },
  };

  const remaining = await db.redListAssessment.count({ where });
  console.log(`${remaining} species to look up`);

  const startedAt = Date.now();
  let processed = 0;
  let found = 0;
  let consecutiveFailures = 0;

  while (!stopRequested) {
    const rows = await db.redListAssessment.findMany({
      where,
      select: { assessmentId: true, gbifUsageKey: true },
      take: BATCH_SIZE,
    });

    if (rows.length === 0) break;

    const batch: Row[] = rows.flatMap((row) =>
      row.gbifUsageKey === null
        ? []
        : [{ assessmentId: row.assessmentId, gbifUsageKey: row.gbifUsageKey }],
    );

    for (let i = 0; i < batch.length && !stopRequested; i += CONCURRENCY) {
      const slice = batch.slice(i, i + CONCURRENCY);
      const results = await Promise.all(slice.map(enrichOne));

      for (const result of results) {
        processed += 1;

        if (result === null) {
          consecutiveFailures += 1;
        } else {
          consecutiveFailures = 0;
          if (result) found += 1;
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

    console.log(`${processed}/${remaining} · ${found} noms FR · eta ${etaMin}m`);
  }

  console.log("Done.");
}

export { runEnrichVernacular, enrichOne };
