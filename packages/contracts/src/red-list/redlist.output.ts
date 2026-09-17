import { z } from "zod";
import { redListCategoryCode, speciesGroup } from "./redlist.fields";

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

const resolvedAs = z.strictObject({
  group: speciesGroup,
  from: z.string(),
});

const groupCount = z.strictObject({
  group: speciesGroup,
  count: z.number().int(),
});
const groupCounts = z.array(groupCount);

const redListPage = z.strictObject({
  items: z.array(redListItem),
  page: z.number().int(),
  pageSize: z.number().int(),
  total: z.number().int(),
  redListVersion: z.string(),
  resolvedAs: resolvedAs.nullable(),
});

const redListCategoryCount = z.strictObject({
  categoryCode: redListCategoryCode,
  count: z.number().int(),
});

const redListCategoryCounts = z.array(redListCategoryCount);

const threatCause = z.enum([
  "habitat",
  "exploitation",
  "climate",
  "pollution",
  "invasive",
  "other",
]);

const threatImpact = z.enum([
  "high",
  "medium",
  "low",
  "negligible",
  "past",
  "unknown",
]);

const speciesThreat = z.strictObject({
  label: z.string(),
  originalLabel: z.string(),
  impactLabel: z.string(),
  scope: z.string().nullable(),
  severity: z.string().nullable(),
  timing: z.string().nullable(),
});

const speciesThreatGroup = z.strictObject({
  cause: threatCause,
  impact: threatImpact,
  impactLabel: z.string(),
  impactLevel: z.number().int().min(0).max(3),
  labels: z.array(z.string()),
});

const speciesThreats = z.strictObject({
  groups: z.array(speciesThreatGroup),
  items: z.array(speciesThreat),
});

const populationTrend = z.enum(["Decreasing", "Increasing", "Stable", "Unknown"]);

const populationFactKey = z.enum([
  "size",
  "subpopulations",
  "largest",
  "fragmentation",
  "generation",
]);

const populationFact = z.strictObject({
  key: populationFactKey,
  label: z.string(),
  text: z.string(),
  hint: z.string().nullable(),
});

const speciesPopulation = z.strictObject({
  trend: populationTrend,
  trendLabel: z.string(),
  trendText: z.string(),
  facts: z.array(populationFact),
});

const presenceKind = z.enum(["current", "uncertain", "extinct"]);

const speciesCountry = z.strictObject({
  code: z.string().length(2),
  name: z.string(),
  introduced: z.boolean(),
});

const presenceGroup = z.strictObject({
  presence: presenceKind,
  label: z.string(),
  countries: z.array(speciesCountry),
});

const speciesDistribution = z.strictObject({
  presence: z.array(presenceGroup),
  habitats: z.array(z.string()),
});

const measureStatus = z.enum(["yes", "partial", "no"]);

const conservationMeasure = z.strictObject({
  label: z.string(),
  status: measureStatus,
  detail: z.string().nullable(),
});

const conservationGroup = z.strictObject({
  title: z.string(),
  measures: z.array(conservationMeasure),
});

const taxonRung = z.strictObject({
  rank: z.string(),
  name: z.string(),
  french: z.string().nullable(),
});

const speciesTaxonomy = z.strictObject({
  authority: z.string().nullable(),
  ladder: z.array(taxonRung),
});

const assessmentText = z.strictObject({
  title: z.string(),
  paragraphs: z.array(z.string()),
});

const redListDetail = redListItem.extend({
  detailAvailable: z.boolean(),
  population: speciesPopulation,
  commonNameEn: z.string().nullable(),
  taxonomy: speciesTaxonomy,
  texts: z.array(assessmentText),
  threats: speciesThreats,
  distribution: speciesDistribution,
  conservation: z.array(conservationGroup),
  systems: z.array(z.string()),
  isEndemic: z.boolean(),
  assessors: z.string().nullable(),
  citation: z.string().nullable(),
});

const countryCategoryCounts = z.strictObject({
  EX: z.number().int(),
  EW: z.number().int(),
  CR: z.number().int(),
  EN: z.number().int(),
  VU: z.number().int(),
});

const redListCountryCount = z.strictObject({
  countryCode: z.string().length(2),
  counts: countryCategoryCounts,
  threatened: z.number().int(),
  rank: z.number().int(),
});
const redListCountryCounts = z.array(redListCountryCount);

const redListVersion = z.strictObject({
  redListVersion: z.string(),
  lastSyncedAt: z.string().nullable(),
});

export {
  redListItem,
  redListPage,
  redListCategoryCount,
  redListCategoryCounts,
  threatCause,
  threatImpact,
  speciesThreat,
  speciesThreatGroup,
  speciesThreats,
  populationTrend,
  populationFactKey,
  populationFact,
  speciesPopulation,
  presenceKind,
  speciesCountry,
  presenceGroup,
  speciesDistribution,
  measureStatus,
  conservationMeasure,
  conservationGroup,
  taxonRung,
  speciesTaxonomy,
  assessmentText,
  redListDetail,
  redListVersion,
  groupCount,
  groupCounts,
  countryCategoryCounts,
  redListCountryCount,
  redListCountryCounts,
};
