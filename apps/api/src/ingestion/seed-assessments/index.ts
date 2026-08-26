import { db } from "@/db";
import {
  assessmentListResponse,
  iucnRequest,
  redListVersionResponse,
  type IucnAssessment,
} from "@/sources";
import {
  CATEGORIES,
  DB_BATCH_SIZE,
  GLOBAL_SCOPE_CODE,
  MAX_PAGES_PER_CATEGORY,
  toRow,
} from "./utils";

async function fetchRedListVersion(): Promise<string> {
  const raw = await iucnRequest("/information/red_list_version");
  return redListVersionResponse.parse(raw).red_list_version;
}

async function fetchCategoryPage(
  code: string,
  page: number,
): Promise<IucnAssessment[]> {
  const raw = await iucnRequest(
    `/red_list_categories/${code}?latest=true&scope_code=${GLOBAL_SCOPE_CODE}&page=${page}`,
  );
  return assessmentListResponse.parse(raw).assessments;
}

async function persist(
  assessments: IucnAssessment[],
  redListVersion: string,
): Promise<void> {
  for (let i = 0; i < assessments.length; i += DB_BATCH_SIZE) {
    const batch = assessments.slice(i, i + DB_BATCH_SIZE);

    await Promise.all(
      batch.map((assessment) => {
        const row = toRow(assessment, redListVersion);
        const { assessmentId: _assessmentId, ...updatable } = row;

        return db.redListAssessment.upsert({
          where: { assessmentId: row.assessmentId },
          create: row,
          update: updatable,
        });
      }),
    );
  }
}

async function seedCategory(
  code: string,
  redListVersion: string,
): Promise<number> {
  let total = 0;

  for (let page = 1; page <= MAX_PAGES_PER_CATEGORY; page += 1) {
    const assessments = await fetchCategoryPage(code, page);

    if (assessments.length === 0) break;

    await persist(assessments, redListVersion);
    total += assessments.length;

    console.log(
      `  ${code} page ${page}: ${assessments.length} (total ${total})`,
    );
  }

  return total;
}

async function runSeedAssessments(): Promise<void> {
  const redListVersion = await fetchRedListVersion();
  console.log(`Red List version: ${redListVersion}`);

  const existing = await db.redListSync.findUnique({
    where: { id: "singleton" },
  });

  if (existing?.redListVersion === redListVersion) {
    console.log("Already up to date. Pass --force to reseed.");

    if (!process.argv.includes("--force")) return;
  }

  for (const code of CATEGORIES) {
    console.log(`\nSeeding ${code}...`);
    const count = await seedCategory(code, redListVersion);
    console.log(`${code}: ${count} assessments`);
  }

  await db.redListSync.upsert({
    where: { id: "singleton" },
    create: { id: "singleton", redListVersion },
    update: { redListVersion, lastSyncedAt: new Date() },
  });

  const stale = await db.redListAssessment.count({
    where: { redListVersion: { not: redListVersion } },
  });

  if (stale > 0)
    console.warn(`\n${stale} assessments from a previous version remain.`);

  console.log("\nDone.");
}

export {
  runSeedAssessments,
  fetchRedListVersion,
  fetchCategoryPage,
  seedCategory,
};
