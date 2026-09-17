import { htmlToParagraphs } from "@/lib";
import { assessmentDetailResponse } from "@/sources";
import type { MappedDetail } from "./entities";
import { buildConservation } from "./conservation";
import { buildDistribution } from "./distribution";
import { buildPopulation } from "./population";
import { buildTaxonLadder, buildTexts } from "./taxonomy";
import { buildThreats } from "./threats";
import {
  cleanValue,
  EMPTY_DETAIL,
  labelOf,
  parseImpact,
  parseYesNo,
  titleCase,
  UNKNOWN,
} from "./utils";

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

  const threats = data.threats.flatMap((threat) => {
    const label = labelOf(threat);
    if (label === null) return [];

    return [
      {
        code: threat.code ?? null,
        label,
        scope: threat.scope ?? null,
        timing: threat.timing ?? null,
        severity: threat.severity === UNKNOWN ? null : (threat.severity ?? null),
        ...parseImpact(threat.score),
      },
    ];
  });

  const locations = data.locations.flatMap((location) => {
    const name = labelOf(location);
    if (name === null) return [];

    return [
      {
        code: location.code ?? null,
        name,
        presence: location.presence ?? null,
        origin: location.origin ?? null,
      },
    ];
  });

  const habitats = data.habitats.map((habitat) => ({
    code: habitat.code ?? null,
    suitability: habitat.suitability ?? null,
  }));

  return {
    detailAvailable: true,
    population: buildPopulation({
      trend: cleanValue(data.population_trend?.description?.en),
      size: cleanValue(info?.population_size),
      subpopulationCount: cleanValue(info?.no_of_subpopulations),
      largestSubpopulation: cleanValue(
        info?.no_of_individuals_in_largest_subpopulation,
      ),
      severelyFragmented: parseYesNo(info?.population_severely_fragmented),
      generationalLength: cleanValue(info?.generational_length),
    }),
    commonNameEn:
      taxon?.common_names.find((name) => name.main === true)?.name ??
      taxon?.common_names[0]?.name ??
      null,
    taxonomy: {
      authority: htmlToParagraphs(taxon?.authority)[0] ?? null,
      ladder: buildTaxonLadder({
        kingdom: titleCase(taxon?.kingdom_name),
        phylum: titleCase(taxon?.phylum_name),
        className: titleCase(taxon?.class_name),
        order: titleCase(taxon?.order_name),
        family: titleCase(taxon?.family_name),
        species: taxon?.scientific_name ?? null,
      }),
    },
    texts: buildTexts((key) => htmlToParagraphs(doc?.[key])),
    threats: buildThreats(threats),
    distribution: buildDistribution(locations, habitats),
    conservation: buildConservation(info?.conservation_actions_in_place ?? []),
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

export { mapDetail };
