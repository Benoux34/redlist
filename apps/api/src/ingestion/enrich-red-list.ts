import { db } from "../db";
import { fetchMedia } from "../lib/iucn/inaturalist";
import { fetchSummary } from "../lib/iucn/wikipedia";

/* ---------- Configuration ---------- */

const DEFAULT_CATEGORIES = ["EX", "CR", "EN"];
const BATCH_SIZE = 100;
const DESCRIPTION_SOURCE_FR = "wikipedia-fr";

/** iNaturalist asks for no more than ~60 requests per minute. */
const INAT = { concurrency: 2, delayMs: 2_000 };
const WIKI = { concurrency: 1, delayMs: 1_000 };

/** Aborts the pass if the source is clearly broken or blocking us. */
const CONSECUTIVE_FAILURE_LIMIT = 15;

/* ---------- CLI ---------- */

const args = process.argv.slice(2);
const categories = (args[0] ?? DEFAULT_CATEGORIES.join(",")).split(",");
const only = args[1] ?? "all";

let stopRequested = false;

process.on("SIGINT", () => {
  console.log("\nStopping after the current batch...");
  stopRequested = true;
});

/* ---------- Helpers ---------- */

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatEta(remaining: number, ratePerMs: number): string {
  if (ratePerMs <= 0) return "unknown";

  const minutes = Math.round(remaining / ratePerMs / 60_000);
  return minutes < 60 ? `${minutes}m` : `${Math.round(minutes / 60)}h`;
}

type Row = {
  assessmentId: number;
  scientificName: string;
  photoUrl: string | null;
  vernacularNameFr: string | null;
};

const ROW_SELECT = {
  assessmentId: true,
  scientificName: true,
  photoUrl: true,
  vernacularNameFr: true,
} as const;

/* ---------- Wikipedia pass ---------- */

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

/* ---------- iNaturalist pass ---------- */

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

/* ---------- Generic pass runner ---------- */

type PassOptions = {
  name: string;
  cursorField: "descriptionFetchedAt" | "mediaFetchedAt";
  concurrency: number;
  delayMs: number;
  enrich: (row: Row) => Promise<boolean>;
};

async function runPass(options: PassOptions): Promise<void> {
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

/* ---------- Main ---------- */

async function main(): Promise<void> {
  console.log(`Categories: ${categories.join(", ")} · sources: ${only}`);

  if (only === "all" || only === "wiki") {
    await runPass({
      name: "wikipedia",
      cursorField: "descriptionFetchedAt",
      concurrency: WIKI.concurrency,
      delayMs: WIKI.delayMs,
      enrich: enrichFromWikipedia,
    });
  }

  if (!stopRequested && (only === "all" || only === "inat")) {
    await runPass({
      name: "inaturalist",
      cursorField: "mediaFetchedAt",
      concurrency: INAT.concurrency,
      delayMs: INAT.delayMs,
      enrich: enrichFromInaturalist,
    });
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

await main();
await db.$disconnect();
