import { describe, expect, it } from "bun:test";
import { buildThreats } from "@api/modules/redlist/detail/threats";
import {
  buildPopulation,
  parseEstimate,
} from "@api/modules/redlist/detail/population";
import { buildDistribution } from "@api/modules/redlist/detail/distribution";
import {
  buildConservation,
  parseMeasure,
} from "@api/modules/redlist/detail/conservation";
import { buildTaxonLadder } from "@api/modules/redlist/detail/taxonomy";
import type { RawThreat } from "@api/modules/redlist/detail/entities";

const threat = (
  code: string,
  impactLabel: string | null,
  impactScore: number | null,
  label = "IUCN label",
): RawThreat => ({
  code,
  label,
  scope: null,
  timing: null,
  severity: null,
  impactScore,
  impactLabel,
});

describe("Backend RedList - Detail threats", () => {
  it("should fold IUCN families into the big causes, most severe first", () => {
    const { groups } = buildThreats([
      threat("5_1_1", "Past Impact", null),
      threat("9_4", "Low Impact", 5),
      threat("2_1_3", "High Impact", 8),
      threat("1_1", "Low Impact", 3),
      threat("11_1", "Medium Impact", 7),
      threat("10_2", "Low Impact", 3),
    ]);

    expect(groups.map((group) => group.cause)).toEqual([
      "habitat",
      "climate",
      "pollution",
      "other",
      "exploitation",
    ]);
    expect(groups[0]).toMatchObject({
      impactLabel: "Impact fort",
      impactLevel: 3,
      labels: ["Cultures agricoles", "Urbanisation et logements"],
    });
    expect(groups[4]?.impactLabel).toBe("Menace passée");
  });

  it("should translate and dedupe labels, keeping the IUCN original", () => {
    const { groups, items } = buildThreats([
      threat("9_1_3", "Low Impact", 3, "Type Unknown/Unrecorded"),
      threat("9_1_1", "High Impact", 8, "Sewage"),
      threat("99_9", null, null, "Raw"),
    ]);

    expect(groups[0]?.labels).toEqual(["Eaux usées"]);
    expect(items[0]).toMatchObject({
      label: "Eaux usées",
      originalLabel: "Sewage",
      impactLabel: "Impact fort",
    });
    expect(items[2]?.label).toBe("Raw");
  });
});

describe("Backend RedList - Detail population", () => {
  const empty = {
    trend: null,
    size: null,
    subpopulationCount: null,
    largestSubpopulation: null,
    severelyFragmented: null,
    generationalLength: null,
  };

  it("should parse single values, ranges and best estimates", () => {
    expect(parseEstimate("25")).toEqual({ min: 25, max: 25, best: null });
    expect(parseEstimate("9.8-13.6,11.5")).toEqual({
      min: 9.8,
      max: 13.6,
      best: 11.5,
    });
    expect(parseEstimate(">10000")).toBeNull();
  });

  it("should turn raw figures into plain French sentences", () => {
    const population = buildPopulation({
      ...empty,
      trend: "Decreasing",
      size: "50-1000",
      severelyFragmented: true,
      generationalLength: "9.8-13.6,11.5",
    });

    expect(population.trendLabel).toBe("En déclin");
    expect(population.facts.map((fact) => fact.text)).toEqual([
      `Entre 50 et ${new Intl.NumberFormat("fr-FR").format(1000)} individus adultes`,
      "Population très fragmentée",
      "Une génération dure environ 11,5 ans",
    ]);
  });

  it("should fall back to an unknown trend and skip missing data", () => {
    const population = buildPopulation({ ...empty, size: ">10000" });

    expect(population.trend).toBe("Unknown");
    expect(population.facts.map((fact) => fact.text)).toEqual([
      ">10000 individus adultes",
    ]);
  });
});

describe("Backend RedList - Detail distribution", () => {
  const location = (
    code: string | null,
    presence: string | null,
    origin = "Native",
  ) => ({ code, name: code ?? "", presence, origin });

  it("should keep countries only, grouped by presence, in French", () => {
    const { presence } = buildDistribution(
      [
        location("MXC-DF", "Extant"),
        location("MX", "Extant"),
        location("BN", "Presence Uncertain"),
        location("IN", "Extinct Post-1500"),
        location("ID", "Possibly Extinct"),
        location("ID", "Extant"),
        location("FR", "Extant", "Introduced"),
        location(null, "Extant"),
      ],
      [],
    );

    expect(
      presence.map((group) => [
        group.presence,
        group.countries.map((country) => country.name),
      ]),
    ).toEqual([
      ["current", ["France", "Indonésie", "Mexique"]],
      ["uncertain", ["Brunei"]],
      ["extinct", ["Inde"]],
    ]);
    expect(presence[0]?.countries[0]?.introduced).toBe(true);
  });

  it("should turn habitat codes into unique labels, suitable first", () => {
    const { habitats } = buildDistribution(
      [],
      [
        { code: "15_1", suitability: "Marginal" },
        { code: "1_6", suitability: "Suitable" },
        { code: "1_9", suitability: "Suitable" },
        { code: "17", suitability: "Suitable" },
      ],
    );

    expect(habitats).toEqual(["Forêt", "Plans d'eau artificiels"]);
  });
});

describe("Backend RedList - Detail conservation", () => {
  it("should translate IUCN answers into statuses", () => {
    expect(
      parseMeasure("Occurs in at least one protected area", "Yes"),
    ).toEqual({
      label: "Présente dans au moins une aire protégée",
      status: "yes",
      detail: null,
    });
    expect(
      parseMeasure("Conservation sites identified", "Yes, over part of range")
        ?.status,
    ).toBe("partial");
    expect(
      parseMeasure("Percentage of population protected by PAs", "31-40"),
    ).toMatchObject({ status: "partial", detail: "31 à 40 %" });
    expect(parseMeasure("Action Recovery Plan", "Unknown")).toBeNull();
  });

  it("should order groups and list measures in place first", () => {
    const groups = buildConservation([
      {
        name: "In-place research and monitoring",
        actions: [
          { name: "Action Recovery Plan", value: "No" },
          { name: "Systematic monitoring scheme", value: "Yes" },
        ],
      },
      {
        name: "In-place land/water protection",
        actions: [
          { name: "Occurs in at least one protected area", value: "Unknown" },
        ],
      },
      {
        name: "In-place species management",
        actions: [{ name: "Subject to ex-situ conservation", value: "Yes" }],
      },
    ]);

    expect(groups.map((group) => group.title)).toEqual([
      "Gestion de l'espèce",
      "Recherche et suivi",
    ]);
    expect(groups[1]?.measures.map((measure) => measure.status)).toEqual([
      "yes",
      "no",
    ]);
  });
});

describe("Backend RedList - Detail taxonomy", () => {
  it("should skip missing ranks and add French names when known", () => {
    expect(
      buildTaxonLadder({
        kingdom: "Animalia",
        phylum: "Chordata",
        className: "Mammalia",
        order: null,
        family: "Hominidae",
        species: "Pongo pygmaeus",
      }),
    ).toEqual([
      { rank: "Règne", name: "Animalia", french: "Animaux" },
      { rank: "Embranchement", name: "Chordata", french: "Chordés" },
      { rank: "Classe", name: "Mammalia", french: "Mammifères" },
      { rank: "Famille", name: "Hominidae", french: null },
      { rank: "Espèce", name: "Pongo pygmaeus", french: null },
    ]);
  });
});
