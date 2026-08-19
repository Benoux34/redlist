import type { RedListDetail, RedListItem } from "@app/contracts";
import { htmlToParagraphs } from "../../lib/iucn/html-text";
import { assessmentDetailResponse } from "../../lib/iucn/iucn-schemas";

type MappedDetail = Omit<RedListDetail, keyof RedListItem>;
type WithDescription = {
  description?: { en?: string | null | undefined } | null | undefined;
};

const YES = "Yes";
const NO = "No";
const IMPACT_SCORE_PATTERN = /:\s*(\d+)/;
const HABITAT_SEPARATOR = " - ";
const UNKNOWN = "Unknown";

const EMPTY_DETAIL = {
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
} satisfies MappedDetail;

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

function mapDetail(raw: unknown): MappedDetail {
  const parsed = assessmentDetailResponse.safeParse(raw);

  if (!parsed.success) {
    console.warn("Unexpected IUCN detail shape", parsed.error.issues);
    return EMPTY_DETAIL;
  }

  const data = parsed.data;
  const taxon = data.taxon;
  const doc = data.documentation;
  const info = data.supplementary_info;

  const threats = data.threats
    .map((threat) => {
      const label = labelOf(threat);

      if (label === null) return null;

      return {
        code: threat.code ?? null,
        familyCode: familyCodeOf(threat.code),
        label,
        scope: threat.scope ?? null,
        timing: threat.timing ?? null,
        severity:
          threat.severity === UNKNOWN ? null : (threat.severity ?? null),
        ...parseImpact(threat.score),
      };
    })
    .filter((threat) => threat !== null)
    .sort((a, b) => (b.impactScore ?? -1) - (a.impactScore ?? -1));

  const habitats = data.habitats
    .map((habitat) => {
      const label = labelOf(habitat);

      if (label === null) return null;

      const [group, ...rest] = label.split(HABITAT_SEPARATOR);

      return {
        code: habitat.code ?? null,
        familyCode: familyCodeOf(habitat.code),
        group: group ?? label,
        detail: rest.length > 0 ? rest.join(HABITAT_SEPARATOR) : null,
        suitability: habitat.suitability ?? null,
      };
    })
    .filter((habitat) => habitat !== null);

  const locations = data.locations
    .map((location) => {
      const name = labelOf(location);

      if (name === null) return null;

      return {
        countryCode: location.code ?? null,
        name,
        presence: location.presence ?? null,
        origin: location.origin ?? null,
      };
    })
    .filter((location) => location !== null);

  return {
    detailAvailable: true,
    population: {
      trend: cleanValue(data.population_trend?.description?.en),
      size: cleanValue(info?.population_size),
      subpopulationCount: cleanValue(info?.no_of_subpopulations),
      largestSubpopulation: cleanValue(
        info?.no_of_individuals_in_largest_subpopulation,
      ),
      severelyFragmented: parseYesNo(info?.population_severely_fragmented),
      generationalLength: cleanValue(info?.generational_length),
    },
    commonNameEn:
      taxon?.common_names.find((name) => name.main === true)?.name ??
      taxon?.common_names[0]?.name ??
      null,
    taxonomy: {
      kingdom: titleCase(taxon?.kingdom_name),
      phylum: titleCase(taxon?.phylum_name),
      className: titleCase(taxon?.class_name),
      order: titleCase(taxon?.order_name),
      family: titleCase(taxon?.family_name),
      authority: htmlToParagraphs(taxon?.authority)[0] ?? null,
    },
    sections: {
      range: htmlToParagraphs(doc?.range),
      population: htmlToParagraphs(doc?.population),
      habitats: htmlToParagraphs(doc?.habitats),
      threats: htmlToParagraphs(doc?.threats),
      measures: htmlToParagraphs(doc?.measures),
      useTrade: htmlToParagraphs(doc?.use_trade),
    },
    threats,
    habitats,
    locations,
    conservationActions: (
      data.supplementary_info?.conservation_actions_in_place ?? []
    ).map((group) => ({
      group: group.name,
      items: group.actions.map((action) =>
        action.value !== null && action.value !== undefined
          ? `${action.name} : ${action.value}`
          : action.name,
      ),
    })),
    systems: data.systems
      .map(labelOf)
      .filter((system): system is string => system !== null),
    isEndemic: data.locations.some((location) => location.is_endemic === true),
    assessors:
      data.credits.find((credit) => credit.credit_type_name === "assessor")
        ?.full ?? null,
    citation: data.citation ?? null,
  };
}

export { EMPTY_DETAIL, mapDetail };
