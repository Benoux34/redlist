import { db } from "@/db";
import { runEnrichTaxonomy } from "./enrich-taxonomy/index";

await runEnrichTaxonomy();
await db.$disconnect();
