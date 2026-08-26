import { db } from "@/db";
import { runSeedLocations } from "./seed-locations/index";

const countryCodes = process.argv[2]?.split(",") ?? ["FR"];

await runSeedLocations(countryCodes);
await db.$disconnect();
