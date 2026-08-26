import { db } from "@/db";
import { runSeedAssessments } from "./seed-assessments/index";

await runSeedAssessments();
await db.$disconnect();
