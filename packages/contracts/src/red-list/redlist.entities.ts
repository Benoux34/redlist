import { z } from "zod";
import { redListCategoryCode, speciesGroup } from "./redlist.fields";
import { redListQuery, redListDetailParams } from "./redlist.input";
import {
  redListCategoryCount,
  redListCategoryCounts,
  redListDetail,
  redListItem,
  redListPage,
  speciesHabitat,
  speciesLocation,
  speciesPopulation,
  speciesSections,
  speciesTaxonomy,
  speciesThreat,
  conservationAction,
  redListVersion,
  groupCounts,
  groupCount,
} from "./redlist.output";

type RedListCategoryCode = z.infer<typeof redListCategoryCode>;
type SpeciesGroup = z.infer<typeof speciesGroup>;
type RedListQuery = z.infer<typeof redListQuery>;
type RedListDetailParams = z.infer<typeof redListDetailParams>;
type RedListItem = z.infer<typeof redListItem>;
type RedListPage = z.infer<typeof redListPage>;
type RedListCategoryCount = z.infer<typeof redListCategoryCount>;
type RedListCategoryCounts = z.infer<typeof redListCategoryCounts>;
type SpeciesTaxonomy = z.infer<typeof speciesTaxonomy>;
type SpeciesSections = z.infer<typeof speciesSections>;
type SpeciesThreat = z.infer<typeof speciesThreat>;
type SpeciesHabitat = z.infer<typeof speciesHabitat>;
type SpeciesLocation = z.infer<typeof speciesLocation>;
type SpeciesPopulation = z.infer<typeof speciesPopulation>;
type ConservationAction = z.infer<typeof conservationAction>;
type RedListDetail = z.infer<typeof redListDetail>;
type RedListVersion = z.infer<typeof redListVersion>;
type GroupCount = z.infer<typeof groupCount>;

export type {
  RedListCategoryCode,
  SpeciesGroup,
  RedListQuery,
  RedListDetailParams,
  RedListItem,
  RedListPage,
  RedListCategoryCount,
  RedListCategoryCounts,
  SpeciesTaxonomy,
  SpeciesSections,
  SpeciesThreat,
  SpeciesHabitat,
  SpeciesLocation,
  SpeciesPopulation,
  ConservationAction,
  RedListDetail,
  RedListVersion,
  GroupCount,
};
