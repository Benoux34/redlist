import { db } from "../db";
import { countryAssessmentsResponse } from "../lib/iucn/iucn-schemas";
import { iucnRequest } from "./iucn";

/** Only the categories we actually store. Others would break the FK. */
const KEPT_CATEGORIES = new Set(["EX", "EW", "CR", "EN", "VU"]);
const MAX_PAGES = 200;
const DB_BATCH_SIZE = 500;

const countryCodes = process.argv[2]?.split(",") ?? ["FR"];

let stopRequested = false;

process.on("SIGINT", () => {
  console.log("\nStopping after the current country...");
  stopRequested = true;
});

async function fetchCountryPage(code: string, page: number): Promise<number[]> {
  const raw = await iucnRequest(
    `/countries/${code}?latest=true&scope_code=1&page=${page}`,
  );

  return countryAssessmentsResponse
    .parse(raw)
    .assessments.filter((assessment) =>
      KEPT_CATEGORIES.has(assessment.red_list_category_code),
    )
    .map((assessment) => assessment.assessment_id);
}

async function persist(
  countryCode: string,
  assessmentIds: number[],
): Promise<number> {
  if (assessmentIds.length === 0) {
    return 0;
  }

  // Only link assessments we actually hold, otherwise the FK rejects.
  const known = await db.redListAssessment.findMany({
    where: { assessmentId: { in: assessmentIds } },
    select: { assessmentId: true },
  });

  const rows = known.map((row) => ({
    assessmentId: row.assessmentId,
    countryCode,
  }));

  for (let i = 0; i < rows.length; i += DB_BATCH_SIZE) {
    await db.redListLocation.createMany({
      data: rows.slice(i, i + DB_BATCH_SIZE),
      skipDuplicates: true,
    });
  }

  return rows.length;
}

async function seedCountry(code: string): Promise<void> {
  let linked = 0;

  for (let page = 1; page <= MAX_PAGES && !stopRequested; page += 1) {
    const assessmentIds = await fetchCountryPage(code, page);

    if (assessmentIds.length === 0) {
      const raw = await iucnRequest(
        `/countries/${code}?latest=true&scope_code=1&page=${page}`,
      );

      if (countryAssessmentsResponse.parse(raw).assessments.length === 0) {
        break;
      }

      continue;
    }

    linked += await persist(code, assessmentIds);
    console.log(`  ${code} page ${page}: ${linked} linked so far`);
  }

  console.log(`${code}: ${linked} species linked`);
}

async function main(): Promise<void> {
  for (const code of countryCodes) {
    if (stopRequested) break;

    console.log(`\nSeeding ${code}...`);
    await seedCountry(code.toUpperCase());
  }
}

await main();
await db.$disconnect();
