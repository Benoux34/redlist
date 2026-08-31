import type { MappedDetail, WithDescription } from "./entities";

const YES = "Yes";
const NO = "No";
const IMPACT_SCORE_PATTERN = /:\s*(\d+)/;
const HABITAT_SEPARATOR = " - ";
const UNKNOWN = "Unknown";

// How long a visitor may wait on the IUCN throttle queue before the page is
// served without its detail sections.
const DETAIL_DEADLINE_MS = 2_500;

const EMPTY_DETAIL: MappedDetail = {
  detailAvailable: false,
  population: {
    trend: null,
    size: null,
    subpopulationCount: null,
    largestSubpopulation: null,
    severelyFragmented: null,
    generationalLength: null,
  },
  commonNameEn: null,
  taxonomy: {
    kingdom: null,
    phylum: null,
    className: null,
    order: null,
    family: null,
    authority: null,
  },
  sections: {
    range: [],
    population: [],
    habitats: [],
    threats: [],
    measures: [],
    useTrade: [],
  },
  threats: [],
  habitats: [],
  locations: [],
  conservationActions: [],
  systems: [],
  isEndemic: false,
  assessors: null,
  citation: null,
};

function labelOf(entry: WithDescription): string | null {
  return entry.description?.en ?? null;
}

function titleCase(value: string | null | undefined): string | null {
  if (value === null || value === undefined) return null;

  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

function cleanValue(value: string | null | undefined): string | null {
  if (value === null || value === undefined) return null;

  const trimmed = value.trim();
  return trimmed === "" || trimmed === UNKNOWN ? null : trimmed;
}

function parseYesNo(value: string | null | undefined): boolean | null {
  if (value === YES) return true;
  if (value === NO) return false;
  return null;
}

function parseImpact(score: string | null | undefined): {
  impactScore: number | null;
  impactLabel: string | null;
} {
  if (score === null || score === undefined || score === UNKNOWN)
    return { impactScore: null, impactLabel: null };

  const match = IMPACT_SCORE_PATTERN.exec(score);
  const [, captured] = match ?? [];

  return {
    impactScore: captured === undefined ? null : Number(captured),
    impactLabel: score.split(":")[0]?.trim() ?? null,
  };
}

function familyCodeOf(code: string | null | undefined): string | null {
  return code?.split("_")[0] ?? null;
}

export {
  DETAIL_DEADLINE_MS,
  YES,
  NO,
  UNKNOWN,
  HABITAT_SEPARATOR,
  IMPACT_SCORE_PATTERN,
  EMPTY_DETAIL,
  labelOf,
  titleCase,
  cleanValue,
  parseYesNo,
  parseImpact,
  familyCodeOf,
};
