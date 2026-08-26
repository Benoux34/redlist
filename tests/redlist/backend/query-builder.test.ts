import {
  MS_PER_DAY,
  PAGE_SIZE,
  buildOrderBy,
  buildWhere,
} from "@api/modules/redlist/service/utils";
import { describe, expect, it } from "bun:test";

describe("Backend RedList - Query Builder & Constants", () => {
  describe("Pagination & Time Constants", () => {
    it("should set page size to 40 items", () => {
      expect(PAGE_SIZE).toBe(40);
    });

    it("should define milliseconds per day (86,400,000)", () => {
      expect(MS_PER_DAY).toBe(24 * 60 * 60 * 1000);
    });
  });

  describe("buildWhere Clauses", () => {
    it("should return empty where clause for blank query", () => {
      expect(buildWhere({ page: 1 })).toEqual({});
    });

    it("should build categoryCode filter", () => {
      expect(buildWhere({ page: 1, category: "CR" })).toEqual({
        categoryCode: "CR",
      });
    });

    it("should build withPhoto filter", () => {
      expect(buildWhere({ page: 1, withPhoto: true })).toEqual({
        photoUrl: { not: null },
      });
    });

    it("should build possiblyExtinct filter", () => {
      expect(buildWhere({ page: 1, possiblyExtinct: true })).toEqual({
        possiblyExtinct: true,
      });
    });

    it("should build alphabetical letter filter (startsWith insensitive)", () => {
      expect(buildWhere({ page: 1, letter: "A" })).toEqual({
        scientificName: { startsWith: "A", mode: "insensitive" },
      });
    });

    it("should build countryCode relational filter on locations", () => {
      expect(buildWhere({ page: 1, countryCode: "FR" })).toEqual({
        locations: { some: { countryCode: "FR" } },
      });
    });

    it("should build search filter matching scientific or vernacular names", () => {
      expect(buildWhere({ page: 1, search: "loup" })).toEqual({
        OR: [
          { scientificName: { contains: "loup", mode: "insensitive" } },
          { vernacularNameFr: { contains: "loup", mode: "insensitive" } },
        ],
      });
    });

    it("should combine multiple filters seamlessly", () => {
      const combined = buildWhere({
        page: 1,
        category: "EN",
        withPhoto: true,
        countryCode: "MG",
        letter: "L",
      });

      expect(combined).toEqual({
        categoryCode: "EN",
        photoUrl: { not: null },
        locations: { some: { countryCode: "MG" } },
        scientificName: { startsWith: "L", mode: "insensitive" },
      });
    });
  });

  describe("buildOrderBy Sorting", () => {
    it("should order by scientificName asc when letter filter is active", () => {
      expect(buildOrderBy({ page: 1, letter: "B" })).toEqual([
        { scientificName: "asc" },
      ]);
    });

    it("should prioritize species with photos (nulls last) then scientificName asc by default", () => {
      expect(buildOrderBy({ page: 1 })).toEqual([
        { photoUrl: { sort: "asc", nulls: "last" } },
        { scientificName: "asc" },
      ]);
    });
  });
});
