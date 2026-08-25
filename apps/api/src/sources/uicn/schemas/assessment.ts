import { z } from "zod";
import { iucnScope } from "./common";

const iucnAssessment = z.object({
  assessment_id: z.number().int(),
  sis_taxon_id: z.number().int().nullish(),
  taxon_scientific_name: z.string(),
  red_list_category_code: z.string(),
  criteria: z.string().nullish(),
  year_published: z.coerce.number().int().nullish(),
  assessment_date: z.coerce.date().nullish(),
  possibly_extinct: z.boolean().nullish(),
  url: z.string().nullish(),
  latest: z.boolean(),
  scopes: z.array(iucnScope).default([]),
});

const assessmentListResponse = z.object({
  assessments: z.array(iucnAssessment),
});

export { iucnAssessment, assessmentListResponse };
