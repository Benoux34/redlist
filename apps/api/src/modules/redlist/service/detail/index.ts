import { htmlToParagraphs } from "@/lib/text";
import { assessmentDetailResponse } from "@/sources/uicn/schemas";
import { iucnRequest } from "@/sources/uicn/client";
import { db } from "@/db";
import { Prisma } from "@/generated/prisma/client";
import type { MappedDetail } from "./entities";
import { buildConservation } from "./conservation";
import { buildDistribution } from "./distribution";
import { buildPopulation } from "./population";
import { buildTaxonLadder, buildTexts } from "./taxonomy";
import { buildThreats } from "./threats";
import {
  cleanValue,
  DETAIL_DEADLINE_MS,
  EMPTY_DETAIL,
  labelOf,
  parseImpact,
  parseYesNo,
  titleCase,
  UNKNOWN,
} from "./utils";

const inFlight = new Map<number, Promise<unknown>>();

async function fetchAndStoreDetail(assessmentId: number): Promise<unknown> {
  const raw = await iucnRequest(`/assessment/${assessmentId}`);

  await db.redListAssessment.update({
    where: { assessmentId },
    data: {
      detail: raw as Prisma.InputJsonValue,
      detailFetchedAt: new Date(),
    },
  });

  return raw;
}

function fetchAndStoreDetailOnce(assessmentId: number): Promise<unknown> {
  const pending = inFlight.get(assessmentId);
  if (pending !== undefined) return pending;

  const request = fetchAndStoreDetail(assessmentId).finally(() => {
    inFlight.delete(assessmentId);
  });

  inFlight.set(assessmentId, request);

  return request;
}

async function fetchDetailWithinDeadline(
  assessmentId: number,
  deadlineMs: number = DETAIL_DEADLINE_MS,
): Promise<unknown> {
  const request = fetchAndStoreDetailOnce(assessmentId);

  request.catch((error: unknown) => {
    console.error(`IUCN detail failed for ${assessmentId}:`, error);
  });

  let timer: ReturnType<typeof setTimeout> | undefined;

  const deadline = new Promise<null>((resolve) => {
    timer = setTimeout(() => resolve(null), deadlineMs);
  });

  try {
    return await Promise.race([request.catch(() => null), deadline]);
  } finally {
    clearTimeout(timer);
  }
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

  const threats = data.threats.flatMap((threat) => {
    const label = labelOf(threat);
    if (label === null) return [];

    return [
      {
        code: threat.code ?? null,
        label,
        scope: threat.scope ?? null,
        timing: threat.timing ?? null,
        severity:
          threat.severity === UNKNOWN ? null : (threat.severity ?? null),
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

export { fetchDetailWithinDeadline, mapDetail };
