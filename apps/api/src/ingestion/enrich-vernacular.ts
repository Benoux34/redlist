import { db } from "@/db";
import { runEnrichVernacular } from "./enrich-vernacular/index";

await runEnrichVernacular();
await db.$disconnect();
