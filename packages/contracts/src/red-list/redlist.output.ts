import { z } from "zod";
import { redListCategoryCode } from "./redlist.fields";

const redListItem = z.strictObject({
  assessmentId: z.number().int(),
  scientificName: z.string(),
  vernacularNameFr: z.string().nullable(),
  categoryCode: redListCategoryCode,
  description: z.string().nullable(),
  descriptionSource: z.string().nullable(),
  photoUrl: z.string().nullable(),
  photoAttribution: z.string().nullable(),
  photoLicense: z.string().nullable(),
  yearPublished: z.number().int().nullable(),
  possiblyExtinct: z.boolean(),
  officialUrl: z.string().nullable(),
});

const redListPage = z.strictObject({
  items: z.array(redListItem),
  page: z.number().int(),
  pageSize: z.number().int(),
  total: z.number().int(),
  redListVersion: z.string(),
});

const redListCategoryCount = z.strictObject({
  categoryCode: redListCategoryCode,
  count: z.number().int(),
});

const redListCategoryCounts = z.array(redListCategoryCount);

const speciesTaxonomy = z.strictObject({
  kingdom: z.string().nullable(),
  phylum: z.string().nullable(),
  className: z.string().nullable(),
  order: z.string().nullable(),
  family: z.string().nullable(),
  authority: z.string().nullable(),
});

const speciesSections = z.strictObject({
  range: z.array(z.string()),
  population: z.array(z.string()),
  habitats: z.array(z.string()),
  threats: z.array(z.string()),
  measures: z.array(z.string()),
  useTrade: z.array(z.string()),
});

const speciesThreat = z.strictObject({
  code: z.string().nullable(),
  familyCode: z.string().nullable(),
  label: z.string(),
  scope: z.string().nullable(),
  timing: z.string().nullable(),
  severity: z.string().nullable(),
  impactScore: z.number().nullable(),
  impactLabel: z.string().nullable(),
});

const speciesHabitat = z.strictObject({
  code: z.string().nullable(),
  familyCode: z.string().nullable(),
  group: z.string(),
  detail: z.string().nullable(),
  suitability: z.string().nullable(),
});

const speciesLocation = z.strictObject({
  countryCode: z.string().nullable(),
  name: z.string(),
  presence: z.string().nullable(),
  origin: z.string().nullable(),
});

const speciesPopulation = z.strictObject({
  trend: z.string().nullable(),
  size: z.string().nullable(),
  subpopulationCount: z.string().nullable(),
  largestSubpopulation: z.string().nullable(),
  severelyFragmented: z.boolean().nullable(),
  generationalLength: z.string().nullable(),
});

const conservationAction = z.strictObject({
  group: z.string(),
  items: z.array(z.string()),
});

const redListDetail = redListItem.extend({
  detailAvailable: z.boolean(),
  population: speciesPopulation,
  commonNameEn: z.string().nullable(),
  taxonomy: speciesTaxonomy,
  sections: speciesSections,
  threats: z.array(speciesThreat),
  habitats: z.array(speciesHabitat),
  locations: z.array(speciesLocation),
  conservationActions: z.array(conservationAction),
  systems: z.array(z.string()),
  isEndemic: z.boolean(),
  assessors: z.string().nullable(),
  citation: z.string().nullable(),
});

export {
  redListItem,
  redListPage,
  redListCategoryCount,
  redListCategoryCounts,
  speciesThreat,
  speciesHabitat,
  speciesLocation,
  speciesSections,
  speciesTaxonomy,
  speciesPopulation,
  conservationAction,
  redListDetail,
};
