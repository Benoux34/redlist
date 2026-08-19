import { z } from "zod";
import { redListCategoryCode } from "./redlist.fields";

const redListQuery = z.strictObject({
  category: redListCategoryCode.optional(),
  search: z.string().trim().min(2).max(80).optional(),
  withPhoto: z.stringbool().optional(),
  page: z.coerce.number().int().min(1).max(2000).default(1),
});

const redListDetailParams = z.object({
  assessmentId: z.coerce.number().int().positive(),
});

export { redListQuery, redListDetailParams };
