import { z } from "zod";
import { redListCategoryCode, speciesGroup } from "./redlist.fields";

const redListQuery = z.strictObject({
  category: redListCategoryCode.optional(),
  group: speciesGroup.optional(),
  search: z.string().trim().min(2).max(80).optional(),
  withPhoto: z.stringbool().optional(),
  page: z.coerce.number().int().min(1).max(2000).default(1),
  possiblyExtinct: z.stringbool().optional(),
  letter: z
    .string()
    .length(1)
    .regex(/^[A-Z]$/)
    .optional(),
  countryCode: z
    .string()
    .length(2)
    .regex(/^[A-Z]{2}$/)
    .optional(),
});

const redListDetailParams = z.object({
  assessmentId: z.coerce.number().int().positive(),
});

export { redListQuery, redListDetailParams };
