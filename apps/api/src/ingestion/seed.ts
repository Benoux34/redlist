import { db } from "@/db";
import { runSeedAssessments } from "./seed-assessments/index";
import { parseCategories } from "./seed-assessments/utils";

await runSeedAssessments(parseCategories(process.argv[2]));
await db.$disconnect();
