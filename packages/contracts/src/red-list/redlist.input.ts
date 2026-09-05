import { z } from "zod";
import {
  countryCodeFilter,
  letterFilter,
  redListCategoryCode,
  speciesGroup,
} from "./redlist.fields";

const redListQuery = z.strictObject({
  category: redListCategoryCode.optional(),
  group: speciesGroup.optional(),
  search: z.string().trim().min(2).max(80).optional(),
  withPhoto: z.stringbool().optional(),
  page: z.coerce.number().int().min(1).max(2000).default(1),
  possiblyExtinct: z.stringbool().optional(),
  letter: letterFilter.optional(),
  countryCode: countryCodeFilter.optional(),
});

// The group pills are scoped to whatever the page they sit on locks down, so a
// page only ever proposes groups that have species within its own listing.
// Mirrors the subset of redListQuery that pages lock rather than let the user
// change.
const groupCountsQuery = z.strictObject({
  letter: letterFilter.optional(),
  countryCode: countryCodeFilter.optional(),
  possiblyExtinct: z.stringbool().optional(),
});

const redListDetailParams = z.object({
  assessmentId: z.coerce.number().int().positive(),
});

export { redListQuery, groupCountsQuery, redListDetailParams };
