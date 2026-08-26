import { db } from "@/db";
import { fetchMedia, fetchSummary } from "@/sources";
import { formatEta, sleep } from "../utils";
import type { PassOptions, Row } from "./entities";
import {
  BATCH_SIZE,
  CONSECUTIVE_FAILURE_LIMIT,
  DEFAULT_CATEGORIES,
  DESCRIPTION_SOURCE_FR,
  INAT,
  ROW_SELECT,
  WIKI,
} from "./utils";

let stopRequested = false;

process.on("SIGINT", () => {
  console.log("\nStopping after the current batch...");
  stopRequested = true;
});

async function enrichFromWikipedia(row: Row): Promise<boolean> {
  const summary = await fetchSummary(row.scientificName);

  const fillName =
    row.vernacularNameFr === null && summary?.vernacularNameFr != null;
  const fillPhoto = row.photoUrl === null && summary?.photoUrl != null;
  const fillDescription = summary?.description != null;

  await db.redListAssessment.update({
    where: { assessmentId: row.assessmentId },
    data: {
      ...(fillName ? { vernacularNameFr: summary.vernacularNameFr } : {}),
      ...(fillPhoto
        ? {
            photoUrl: summary.photoUrl,
            photoAttribution: "Wikimedia Commons",
            photoLicense: "wikimedia",
          }
        : {}),
      ...(fillDescription
        ? {
            description: summary.description,
            descriptionSource: DESCRIPTION_SOURCE_FR,
          }
        : {}),
      descriptionFetchedAt: new Date(),
    },
  });

  return summary !== null;
}

async function enrichFromInaturalist(row: Row): Promise<boolean> {
  const media = await fetchMedia(row.scientificName);

  const fillName =
    row.vernacularNameFr === null && media?.vernacularNameFr != null;
  const fillPhoto = row.photoUrl === null && media?.photoUrl != null;

  await db.redListAssessment.update({
    where: { assessmentId: row.assessmentId },
    data: {
      ...(fillName ? { vernacularNameFr: media.vernacularNameFr } : {}),
      ...(fillPhoto
        ? {
            photoUrl: media.photoUrl,
            photoAttribution: media.photoAttribution,
            photoLicense: media.photoLicense,
          }
        : {}),
      mediaFetchedAt: new Date(),
    },
  });

  return media !== null;
}

async function runPass(
  options: PassOptions,
  categories: string[],
): Promise<void> {
  const where = {
    [options.cursorField]: null,
    categoryCode: { in: categories },
  };

  const remaining = await db.redListAssessment.count({ where });

  if (remaining === 0) {
    console.log(`\n[${options.name}] nothing to do.`);
    return;
  }

  console.log(`\n[${options.name}] ${remaining} rows to process`);

  const startedAt = Date.now();
  let processed = 0;
  let hits = 0;
  let consecutiveFailures = 0;

  while (!stopRequested) {
    const rows: Row[] = await db.redListAssessment.findMany({
      where,
      select: ROW_SELECT,
      take: BATCH_SIZE,
    });

    if (rows.length === 0) break;

    for (
      let i = 0;
      i < rows.length && !stopRequested;
      i += options.concurrency
    ) {
      const slice = rows.slice(i, i + options.concurrency);

      const results = await Promise.all(
        slice.map(async (row) => {
          try {
            return await options.enrich(row);
          } catch (error) {
            console.error(`  ${row.scientificName}:`, error);
            return null;
          }
        }),
      );

      for (const result of results) {
        processed += 1;

        if (result === null) {
          consecutiveFailures += 1;
        } else {
          consecutiveFailures = 0;
          if (result) hits += 1;
        }
      }

      if (consecutiveFailures >= CONSECUTIVE_FAILURE_LIMIT) {
        console.error(
          `\n[${options.name}] aborted: ${consecutiveFailures} consecutive errors.`,
        );
        return;
      }

      await sleep(options.delayMs);
    }

    const rate = processed / (Date.now() - startedAt);
    console.log(
      `[${options.name}] ${processed}/${remaining} · ${hits} matched · eta ${formatEta(remaining - processed, rate)}`,
    );
  }
}

async function runEnrichRedList(
  categories: string[] = [...DEFAULT_CATEGORIES],
  only: string = "all",
): Promise<void> {
  console.log(`Categories: ${categories.join(", ")} · sources: ${only}`);

  if (only === "all" || only === "wiki") {
    await runPass(
      {
        name: "wikipedia",
        cursorField: "descriptionFetchedAt",
        concurrency: WIKI.concurrency,
        delayMs: WIKI.delayMs,
        enrich: enrichFromWikipedia,
      },
      categories,
    );
  }

  if (!stopRequested && (only === "all" || only === "inat")) {
    await runPass(
      {
        name: "inaturalist",
        cursorField: "mediaFetchedAt",
        concurrency: INAT.concurrency,
        delayMs: INAT.delayMs,
        enrich: enrichFromInaturalist,
      },
      categories,
    );
  }

  const summary = await db.redListAssessment.groupBy({
    by: ["categoryCode"],
    where: { categoryCode: { in: categories } },
    _count: {
      _all: true,
      photoUrl: true,
      vernacularNameFr: true,
      description: true,
    },
  });

  console.log("\nFinal state:");

  for (const row of summary) {
    console.log(
      `  ${row.categoryCode}: ${row._count.photoUrl} photos · ` +
        `${row._count.vernacularNameFr} noms FR · ` +
        `${row._count.description} descriptions · ${row._count._all} total`,
    );
  }
}

export {
  runEnrichRedList,
  enrichFromWikipedia,
  enrichFromInaturalist,
  runPass,
};
