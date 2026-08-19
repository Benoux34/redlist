import { z } from "zod";

const redListCategoryCode = z.enum(["EX", "EW", "CR", "EN"]);

export { redListCategoryCode };
