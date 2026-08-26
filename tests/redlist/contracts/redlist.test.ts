import { describe, expect, it } from "bun:test";
import {
  groupCounts,
  redListCategoryCode,
  redListCategoryCounts,
  redListDetail,
  redListDetailParams,
  redListItem,
  redListPage,
  redListQuery,
  redListVersion,
  speciesGroup,
} from "@app/contracts";

describe("Contracts - RedList Fields", () => {
  describe("redListCategoryCode", () => {
    it("should accept valid IUCN category codes", () => {
      const validCategories = ["EX", "EW", "CR", "EN", "VU"] as const;
      for (const code of validCategories) {
        expect(redListCategoryCode.parse(code)).toBe(code);
      }
    });

    it("should reject non-threatened or invalid category codes", () => {
      expect(() => redListCategoryCode.parse("LC")).toThrow();
      expect(() => redListCategoryCode.parse("NT")).toThrow();
      expect(() => redListCategoryCode.parse("DD")).toThrow();
      expect(() => redListCategoryCode.parse("UNKNOWN")).toThrow();
    });
  });

  describe("speciesGroup", () => {
    it("should accept all 8 supported species groups", () => {
      const groups = [
        "mammiferes",
        "oiseaux",
        "reptiles",
        "amphibiens",
        "poissons",
        "insectes",
        "mollusques",
        "plantes",
      ] as const;
      for (const group of groups) {
        expect(speciesGroup.parse(group)).toBe(group);
      }
    });

    it("should reject unknown groups", () => {
      expect(() => speciesGroup.parse("champignons")).toThrow();
      expect(() => speciesGroup.parse("invertebres")).toThrow();
    });
  });
});

describe("Contracts - RedList Inputs", () => {
  describe("redListQuery", () => {
    it("should parse default empty query with page=1", () => {
      const query = redListQuery.parse({});
      expect(query.page).toBe(1);
      expect(query.category).toBeUndefined();
      expect(query.search).toBeUndefined();
      expect(query.withPhoto).toBeUndefined();
    });

    it("should coerce page number from string", () => {
      const query = redListQuery.parse({ page: "5" });
      expect(query.page).toBe(5);
    });

    it("should validate and trim search keyword between 2 and 80 chars", () => {
      const query = redListQuery.parse({ search: "  Loup gris  " });
      expect(query.search).toBe("Loup gris");

      expect(() => redListQuery.parse({ search: "a" })).toThrow();
      expect(() => redListQuery.parse({ search: "a".repeat(81) })).toThrow();
    });

    it("should validate single uppercase letter for alphabet filter", () => {
      expect(redListQuery.parse({ letter: "A" }).letter).toBe("A");
      expect(redListQuery.parse({ letter: "Z" }).letter).toBe("Z");

      expect(() => redListQuery.parse({ letter: "a" })).toThrow();
      expect(() => redListQuery.parse({ letter: "AB" })).toThrow();
      expect(() => redListQuery.parse({ letter: "1" })).toThrow();
    });

    it("should validate two-letter ISO uppercase country code", () => {
      expect(redListQuery.parse({ countryCode: "FR" }).countryCode).toBe("FR");
      expect(redListQuery.parse({ countryCode: "MG" }).countryCode).toBe("MG");

      expect(() => redListQuery.parse({ countryCode: "fr" })).toThrow();
      expect(() => redListQuery.parse({ countryCode: "FRA" })).toThrow();
      expect(() => redListQuery.parse({ countryCode: "F" })).toThrow();
    });

    it("should validate boolean strings for withPhoto and possiblyExtinct", () => {
      expect(redListQuery.parse({ withPhoto: "true" }).withPhoto).toBe(true);
      expect(redListQuery.parse({ withPhoto: "false" }).withPhoto).toBe(false);
      expect(
        redListQuery.parse({ possiblyExtinct: "true" }).possiblyExtinct,
      ).toBe(true);
    });

    it("should reject extraneous query parameters", () => {
      expect(() => redListQuery.parse({ hack: "true" })).toThrow();
    });
  });

  describe("redListDetailParams", () => {
    it("should parse and coerce assessmentId to a positive integer", () => {
      expect(redListDetailParams.parse({ assessmentId: "12345" })).toEqual({
        assessmentId: 12345,
      });
      expect(redListDetailParams.parse({ assessmentId: 99 })).toEqual({
        assessmentId: 99,
      });
    });

    it("should reject negative or zero assessmentId", () => {
      expect(() => redListDetailParams.parse({ assessmentId: "-1" })).toThrow();
      expect(() => redListDetailParams.parse({ assessmentId: 0 })).toThrow();
      expect(() =>
        redListDetailParams.parse({ assessmentId: "invalid" }),
      ).toThrow();
    });
  });
});

describe("Contracts - RedList Outputs", () => {
  const sampleItem = {
    assessmentId: 1001,
    scientificName: "Panthera uncia",
    vernacularNameFr: "Léopard des neiges",
    categoryCode: "VU" as const,
    description: "Espèce vulnérable des montagnes d'Asie centrale.",
    descriptionSource: "Wikipedia",
    photoUrl: "https://example.com/snow-leopard.jpg",
    photoAttribution: "John Doe",
    photoLicense: "CC-BY-SA",
    yearPublished: 2020,
    possiblyExtinct: false,
    officialUrl: "https://iucnredlist.org/species/1001",
  };

  it("should validate redListItem schema with nullable fields", () => {
    expect(redListItem.parse(sampleItem)).toEqual(sampleItem);

    const minimalItem = {
      assessmentId: 2002,
      scientificName: "Rare Plant",
      vernacularNameFr: null,
      categoryCode: "CR" as const,
      description: null,
      descriptionSource: null,
      photoUrl: null,
      photoAttribution: null,
      photoLicense: null,
      yearPublished: null,
      possiblyExtinct: true,
      officialUrl: null,
    };
    expect(redListItem.parse(minimalItem)).toEqual(minimalItem);
  });

  it("should validate redListPage schema", () => {
    const page = {
      items: [sampleItem],
      page: 1,
      pageSize: 40,
      total: 1,
      redListVersion: "2024-2",
      resolvedAs: null,
    };

    expect(redListPage.parse(page)).toEqual(page);

    const pageWithResolved = {
      ...page,
      resolvedAs: {
        group: "mammiferes" as const,
        from: "felins",
      },
    };
    expect(redListPage.parse(pageWithResolved)).toEqual(pageWithResolved);
  });

  it("should validate category counts and group counts", () => {
    const categoryCounts = [
      { categoryCode: "CR" as const, count: 42 },
      { categoryCode: "EN" as const, count: 128 },
    ];
    expect(redListCategoryCounts.parse(categoryCounts)).toEqual(categoryCounts);

    const groups = [
      { group: "oiseaux" as const, count: 1500 },
      { group: "reptiles" as const, count: 800 },
    ];
    expect(groupCounts.parse(groups)).toEqual(groups);
  });

  it("should validate full redListDetail schema", () => {
    const fullDetail = {
      ...sampleItem,
      detailAvailable: true,
      commonNameEn: "Snow Leopard",
      population: {
        trend: "Decreasing",
        size: "4000-6500",
        subpopulationCount: null,
        largestSubpopulation: null,
        severelyFragmented: true,
        generationalLength: "8 years",
      },
      taxonomy: {
        kingdom: "Animalia",
        phylum: "Chordata",
        className: "Mammalia",
        order: "Carnivora",
        family: "Felidae",
        authority: "Schreber, 1775",
      },
      sections: {
        range: ["Montagnes d'Asie Centrale"],
        population: ["En déclin"],
        habitats: ["Régions alpines"],
        threats: ["Braconnage", "Changement climatique"],
        measures: ["Aires protégées"],
        useTrade: ["Commerce illégal de fourrure"],
      },
      threats: [
        {
          code: "5.1.1",
          familyCode: "5.1",
          label: "Chasse et capture",
          scope: null,
          timing: "Ongoing",
          severity: "High",
          impactScore: 8,
          impactLabel: "High Impact",
        },
      ],
      habitats: [
        {
          code: "6",
          familyCode: null,
          group: "Régions rocheuses",
          detail: "Altitude > 3000m",
          suitability: "Suitable",
        },
      ],
      locations: [
        {
          countryCode: "CN",
          name: "China",
          presence: "Extant",
          origin: "Native",
        },
      ],
      conservationActions: [
        {
          group: "Protection des espèces",
          items: ["Interdiction stricte de la chasse"],
        },
      ],
      systems: ["Terrestrial"],
      isEndemic: false,
      assessors: "IUCN SSC Cat Specialist Group",
      citation: "IUCN 2024. The IUCN Red List of Threatened Species.",
    };

    expect(redListDetail.parse(fullDetail)).toEqual(fullDetail);
  });

  it("should validate redListVersion schema", () => {
    const version = {
      redListVersion: "2024-2",
      lastSyncedAt: "2026-08-20T14:30:00.000Z",
    };
    expect(redListVersion.parse(version)).toEqual(version);
  });
});
