import { z } from "zod";
import { redListCategoryCode, speciesGroup } from "./redlist.fields";
import {
  redListQuery,
  groupCountsQuery,
  countryCountsQuery,
  redListDetailParams,
} from "./redlist.input";
import {
  redListCategoryCount,
  redListCategoryCounts,
  redListDetail,
  redListItem,
  redListPage,
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
  redListVersion,
  groupCount,
  countryCategoryCounts,
  redListCountryCount,
  redListCountryCounts,
} from "./redlist.output";

type RedListCategoryCode = z.infer<typeof redListCategoryCode>;
type SpeciesGroup = z.infer<typeof speciesGroup>;
type RedListQuery = z.infer<typeof redListQuery>;
type GroupCountsQuery = z.infer<typeof groupCountsQuery>;
type CountryCountsQuery = z.infer<typeof countryCountsQuery>;
type RedListDetailParams = z.infer<typeof redListDetailParams>;
type RedListItem = z.infer<typeof redListItem>;
type RedListPage = z.infer<typeof redListPage>;
type RedListCategoryCount = z.infer<typeof redListCategoryCount>;
type RedListCategoryCounts = z.infer<typeof redListCategoryCounts>;
type ThreatCause = z.infer<typeof threatCause>;
type ThreatImpact = z.infer<typeof threatImpact>;
type SpeciesThreat = z.infer<typeof speciesThreat>;
type SpeciesThreatGroup = z.infer<typeof speciesThreatGroup>;
type SpeciesThreats = z.infer<typeof speciesThreats>;
type PopulationTrend = z.infer<typeof populationTrend>;
type PopulationFactKey = z.infer<typeof populationFactKey>;
type PopulationFact = z.infer<typeof populationFact>;
type SpeciesPopulation = z.infer<typeof speciesPopulation>;
type PresenceKind = z.infer<typeof presenceKind>;
type SpeciesCountry = z.infer<typeof speciesCountry>;
type PresenceGroup = z.infer<typeof presenceGroup>;
type SpeciesDistribution = z.infer<typeof speciesDistribution>;
type MeasureStatus = z.infer<typeof measureStatus>;
type ConservationMeasure = z.infer<typeof conservationMeasure>;
type ConservationGroup = z.infer<typeof conservationGroup>;
type TaxonRung = z.infer<typeof taxonRung>;
type SpeciesTaxonomy = z.infer<typeof speciesTaxonomy>;
type AssessmentText = z.infer<typeof assessmentText>;
type RedListDetail = z.infer<typeof redListDetail>;
type RedListVersion = z.infer<typeof redListVersion>;
type GroupCount = z.infer<typeof groupCount>;
type CountryCategoryCounts = z.infer<typeof countryCategoryCounts>;
type RedListCountryCount = z.infer<typeof redListCountryCount>;
type RedListCountryCounts = z.infer<typeof redListCountryCounts>;

export type {
  RedListCategoryCode,
  SpeciesGroup,
  RedListQuery,
  GroupCountsQuery,
  CountryCountsQuery,
  RedListDetailParams,
  RedListItem,
  RedListPage,
  RedListCategoryCount,
  RedListCategoryCounts,
  ThreatCause,
  ThreatImpact,
  SpeciesThreat,
  SpeciesThreatGroup,
  SpeciesThreats,
  PopulationTrend,
  PopulationFactKey,
  PopulationFact,
  SpeciesPopulation,
  PresenceKind,
  SpeciesCountry,
  PresenceGroup,
  SpeciesDistribution,
  MeasureStatus,
  ConservationMeasure,
  ConservationGroup,
  TaxonRung,
  SpeciesTaxonomy,
  AssessmentText,
  RedListDetail,
  RedListVersion,
  GroupCount,
  CountryCategoryCounts,
  RedListCountryCount,
  RedListCountryCounts,
};
