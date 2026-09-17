import type { RedListDetail, RedListItem } from "@app/contracts";

type MappedDetail = Omit<RedListDetail, keyof RedListItem>;
type WithDescription = {
  description?: { en?: string | null | undefined } | null | undefined;
};

type RawThreat = Readonly<{
  code: string | null;
  label: string;
  scope: string | null;
  timing: string | null;
  severity: string | null;
  impactScore: number | null;
  impactLabel: string | null;
}>;

type RawHabitat = Readonly<{
  code: string | null;
  suitability: string | null;
}>;

type RawLocation = Readonly<{
  code: string | null;
  name: string;
  presence: string | null;
  origin: string | null;
}>;

type RawPopulation = Readonly<{
  trend: string | null;
  size: string | null;
  subpopulationCount: string | null;
  largestSubpopulation: string | null;
  severelyFragmented: boolean | null;
  generationalLength: string | null;
}>;

type RawConservationGroup = Readonly<{
  name: string;
  actions: readonly Readonly<{ name: string; value?: string | null | undefined }>[];
}>;

type RawTaxonomy = Readonly<{
  kingdom: string | null;
  phylum: string | null;
  className: string | null;
  order: string | null;
  family: string | null;
  species: string | null;
}>;

type Estimate = Readonly<{
  min: number;
  max: number;
  best: number | null;
}>;

export type {
  Estimate,
  MappedDetail,
  RawConservationGroup,
  RawHabitat,
  RawLocation,
  RawPopulation,
  RawTaxonomy,
  RawThreat,
  WithDescription,
};
