import { db } from "@/db";
import { runEnrichRedList } from "./enrich-red-list/index";

const args = process.argv.slice(2);
const categories = (args[0] ?? "EX,EW,CR,EN,VU").split(",");
const only = args[1] ?? "all";

await runEnrichRedList(categories, only);
await db.$disconnect();
