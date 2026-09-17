import type { MappedDetail, WithDescription } from "./entities";

const YES = "Yes";
const NO = "No";
const IMPACT_SCORE_PATTERN = /:\s*(\d+)/;
const UNKNOWN = "Unknown";

const DETAIL_DEADLINE_MS = 2_500;

const EMPTY_DETAIL: MappedDetail = {
  detailAvailable: false,
  population: {
    trend: "Unknown",
    trendLabel: "Tendance inconnue",
    trendText:
      "Les données manquent pour savoir si la population augmente ou diminue.",
    facts: [],
  },
  commonNameEn: null,
  taxonomy: { authority: null, ladder: [] },
  texts: [],
  threats: { groups: [], items: [] },
  distribution: { presence: [], habitats: [] },
  conservation: [],
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

export {
  DETAIL_DEADLINE_MS,
  YES,
  NO,
  UNKNOWN,
  IMPACT_SCORE_PATTERN,
  EMPTY_DETAIL,
  labelOf,
  titleCase,
  cleanValue,
  parseYesNo,
  parseImpact,
};
