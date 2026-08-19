import { z } from "zod";

const redListVersionResponse = z.object({
  red_list_version: z.string(),
});

const iucnScope = z.object({
  code: z.string(),
});

const enDescription = z.object({ en: z.string().nullish() }).nullish();

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

const commonName = z.object({
  name: z.string(),
  language: z.string().nullish(),
  main: z.boolean().nullish(),
});

const taxonDetail = z.object({
  scientific_name: z.string().nullish(),
  kingdom_name: z.string().nullish(),
  phylum_name: z.string().nullish(),
  class_name: z.string().nullish(),
  order_name: z.string().nullish(),
  family_name: z.string().nullish(),
  authority: z.string().nullish(),
  common_names: z.array(commonName).default([]),
});

const iucnThreat = z.object({
  code: z.string().nullish(),
  description: enDescription,
  scope: z.string().nullish(),
  timing: z.string().nullish(),
  severity: z.string().nullish(),
  score: z.string().nullish(),
  internationalTrade: z.string().nullish(),
});

const iucnHabitat = z.object({
  code: z.string().nullish(),
  description: enDescription,
  suitability: z.string().nullish(),
  majorImportance: z.string().nullish(),
});

const iucnLocation = z.object({
  code: z.string().nullish(),
  description: enDescription,
  is_endemic: z.boolean().nullish(),
  origin: z.string().nullish(),
  presence: z.string().nullish(),
});

const iucnSystem = z.object({ description: enDescription });

const iucnCredit = z.object({
  credit_type_name: z.string().nullish(),
  full: z.string().nullish(),
});

const conservationActionGroup = z.object({
  name: z.string(),
  actions: z
    .array(
      z.object({
        name: z.string(),
        value: z.string().nullish(),
      }),
    )
    .default([]),
});

const assessmentDetailResponse = z.object({
  citation: z.string().nullish(),
  population_trend: z.object({ description: enDescription }).nullish(),
  taxon: taxonDetail.nullish(),
  documentation: z
    .object({
      range: z.string().nullish(),
      population: z.string().nullish(),
      habitats: z.string().nullish(),
      threats: z.string().nullish(),
      measures: z.string().nullish(),
      use_trade: z.string().nullish(),
    })
    .nullish(),
  threats: z.array(iucnThreat).default([]),
  habitats: z.array(iucnHabitat).default([]),
  locations: z.array(iucnLocation).default([]),
  systems: z.array(iucnSystem).default([]),
  credits: z.array(iucnCredit).default([]),
  supplementary_info: z
    .object({
      population_size: z.string().nullish(),
      no_of_subpopulations: z.string().nullish(),
      no_of_individuals_in_largest_subpopulation: z.string().nullish(),
      population_severely_fragmented: z.string().nullish(),
      generational_length: z.string().nullish(),
      conservation_actions_in_place: z
        .array(conservationActionGroup)
        .default([]),
    })
    .nullish(),
});

export type IucnAssessmentDetail = z.infer<typeof assessmentDetailResponse>;
export type IucnAssessment = z.infer<typeof iucnAssessment>;
export {
  assessmentListResponse,
  redListVersionResponse,
  assessmentDetailResponse,
};
