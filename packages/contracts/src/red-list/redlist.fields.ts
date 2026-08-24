import { z } from "zod";

const redListCategoryCode = z.enum(["EX", "EW", "CR", "EN", "VU"]);

export { redListCategoryCode };
