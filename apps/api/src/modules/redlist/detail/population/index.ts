import type {
  PopulationFact,
  PopulationTrend,
  SpeciesPopulation,
} from "@app/contracts";
import type { Estimate, RawPopulation } from "../entities";
import { TRENDS, numberFr } from "./utils";

function trendOf(trend: string | null): PopulationTrend {
  return trend === "Decreasing" || trend === "Increasing" || trend === "Stable"
    ? trend
    : "Unknown";
}

function parseEstimate(raw: string | null): Estimate | null {
  if (raw === null) return null;

  const [range = "", best] = raw.split(",");
  const bounds = range.split("-").map((part) => part.trim());

  if (bounds.length > 2 || bounds.some((part) => part === "")) return null;

  const [min, max = min] = bounds.map(Number);
  const bestValue = best === undefined ? null : Number(best.trim());

  if (min === undefined || max === undefined) return null;
  if (!Number.isFinite(min) || !Number.isFinite(max)) return null;

  return {
    min,
    max,
    best: bestValue !== null && Number.isFinite(bestValue) ? bestValue : null,
  };
}

function describeEstimate(estimate: Estimate, unit: string): string {
  if (estimate.best !== null)
    return `environ ${numberFr.format(estimate.best)} ${unit}`;

  if (estimate.min === estimate.max)
    return `environ ${numberFr.format(estimate.min)} ${unit}`;

  return `entre ${numberFr.format(estimate.min)} et ${numberFr.format(estimate.max)} ${unit}`;
}

function countOf(estimate: Estimate): string {
  if (estimate.best !== null) return numberFr.format(estimate.best);
  if (estimate.min === estimate.max) return numberFr.format(estimate.min);

  return `${numberFr.format(estimate.min)} à ${numberFr.format(estimate.max)}`;
}

function buildFacts(population: RawPopulation): PopulationFact[] {
  const facts: PopulationFact[] = [];

  if (population.size !== null) {
    const estimate = parseEstimate(population.size);
    const text =
      estimate === null
        ? `${population.size} individus adultes`
        : describeEstimate(estimate, "individus adultes");

    facts.push({
      key: "size",
      label: "Effectif",
      text: text.charAt(0).toUpperCase() + text.slice(1),
      hint: "Seuls les adultes capables de se reproduire sont comptés.",
    });
  }

  const subpopulations = parseEstimate(population.subpopulationCount);
  if (subpopulations !== null && subpopulations.max > 1)
    facts.push({
      key: "subpopulations",
      label: "Répartition",
      text: `Répartie en ${countOf(subpopulations)} groupes distincts`,
      hint: "Des populations séparées, qui se croisent rarement.",
    });

  const largest = parseEstimate(population.largestSubpopulation);
  if (largest !== null)
    facts.push({
      key: "largest",
      label: "Plus grand groupe",
      text: `Le plus grand groupe compte ${describeEstimate(largest, "individus")}`,
      hint: null,
    });

  if (population.severelyFragmented !== null)
    facts.push({
      key: "fragmentation",
      label: "Fragmentation",
      ...(population.severelyFragmented
        ? {
            text: "Population très fragmentée",
            hint: "Les groupes sont isolés les uns des autres, ce qui limite les échanges et fragilise l'espèce.",
          }
        : {
            text: "Population peu fragmentée",
            hint: "Les groupes restent reliés entre eux.",
          }),
    });

  const generation = parseEstimate(population.generationalLength);
  if (generation !== null) {
    const years = Math.max(generation.best ?? 0, generation.max);

    facts.push({
      key: "generation",
      label: "Génération",
      text: `Une génération dure ${describeEstimate(generation, years > 1 ? "ans" : "an")}`,
      hint: null,
    });
  }

  return facts;
}

function buildPopulation(population: RawPopulation): SpeciesPopulation {
  const trend = trendOf(population.trend);

  return {
    trend,
    trendLabel: TRENDS[trend].label,
    trendText: TRENDS[trend].text,
    facts: buildFacts(population),
  };
}

export { buildPopulation, parseEstimate };
