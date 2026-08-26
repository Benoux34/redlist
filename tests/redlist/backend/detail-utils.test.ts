import {
  EMPTY_DETAIL,
  cleanValue,
  familyCodeOf,
  labelOf,
  parseImpact,
  parseYesNo,
  titleCase,
} from "@api/modules/redlist/detail/utils";
import { describe, expect, it } from "bun:test";

describe("Backend RedList - Detail Extraction Utilities", () => {
  describe("titleCase", () => {
    it("should format uppercase taxonomy names into Title Case", () => {
      expect(titleCase("MAMMALIA")).toBe("Mammalia");
      expect(titleCase("chordata")).toBe("Chordata");
      expect(titleCase("CARNIVORA")).toBe("Carnivora");
    });

    it("should handle null and undefined safely", () => {
      expect(titleCase(null)).toBeNull();
      expect(titleCase(undefined)).toBeNull();
    });
  });

  describe("cleanValue", () => {
    it("should trim and return valid non-empty strings", () => {
      expect(cleanValue("  500-1000 individus  ")).toBe("500-1000 individus");
    });

    it("should convert empty strings, whitespace, and 'Unknown' to null", () => {
      expect(cleanValue("")).toBeNull();
      expect(cleanValue("   ")).toBeNull();
      expect(cleanValue("Unknown")).toBeNull();
      expect(cleanValue(null)).toBeNull();
      expect(cleanValue(undefined)).toBeNull();
    });
  });

  describe("parseYesNo", () => {
    it("should parse 'Yes' to true and 'No' to false", () => {
      expect(parseYesNo("Yes")).toBe(true);
      expect(parseYesNo("No")).toBe(false);
    });

    it("should return null for other values", () => {
      expect(parseYesNo("Unknown")).toBeNull();
      expect(parseYesNo(null)).toBeNull();
      expect(parseYesNo(undefined)).toBeNull();
    });
  });

  describe("parseImpact", () => {
    it("should parse structured impact score and label", () => {
      expect(parseImpact("High: 8")).toEqual({
        impactScore: 8,
        impactLabel: "High",
      });
      expect(parseImpact("Low Impact: 2")).toEqual({
        impactScore: 2,
        impactLabel: "Low Impact",
      });
    });

    it("should return null values for Unknown or missing score", () => {
      expect(parseImpact("Unknown")).toEqual({
        impactScore: null,
        impactLabel: null,
      });
      expect(parseImpact(null)).toEqual({
        impactScore: null,
        impactLabel: null,
      });
    });
  });

  describe("familyCodeOf", () => {
    it("should extract family code before underscore separator", () => {
      expect(familyCodeOf("5.1_2")).toBe("5.1");
      expect(familyCodeOf("2.1_1")).toBe("2.1");
      expect(familyCodeOf("1")).toBe("1");
    });

    it("should handle null and undefined safely", () => {
      expect(familyCodeOf(null)).toBeNull();
      expect(familyCodeOf(undefined)).toBeNull();
    });
  });

  describe("labelOf & EMPTY_DETAIL", () => {
    it("should extract English description label", () => {
      expect(labelOf({ description: { en: "Terrestrial" } })).toBe(
        "Terrestrial",
      );
      expect(labelOf({})).toBeNull();
    });

    it("should define a complete fallback EMPTY_DETAIL object", () => {
      expect(EMPTY_DETAIL.detailAvailable).toBe(false);
      expect(EMPTY_DETAIL.threats).toEqual([]);
      expect(EMPTY_DETAIL.habitats).toEqual([]);
      expect(EMPTY_DETAIL.locations).toEqual([]);
    });
  });
});
