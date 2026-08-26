import {
  buildSearchText,
  normalizeForSearch,
} from "@api/lib/text/search-text";
import { describe, expect, it } from "bun:test";

describe("Shared Backend - Search Text Normalization", () => {
  describe("normalizeForSearch", () => {
    it("should lowercase and trim input string", () => {
      expect(normalizeForSearch("  Panthera UNCIA  ")).toBe("panthera uncia");
    });

    it("should remove French accents and diacritics", () => {
      expect(normalizeForSearch("Éléphant d'Afrique")).toBe(
        "elephant d'afrique",
      );
      expect(normalizeForSearch("Lémur couronné")).toBe("lemur couronne");
      expect(normalizeForSearch("Céphale à crête")).toBe("cephale a crete");
    });

    it("should collapse multiple whitespace characters into single space", () => {
      expect(normalizeForSearch("Grand    Requin      Blanc")).toBe(
        "grand requin blanc",
      );
    });
  });

  describe("buildSearchText", () => {
    it("should concatenate scientific name and vernacular name with normalization", () => {
      const result = buildSearchText("Panthera uncia", "Léopard des neiges");
      expect(result).toBe("panthera uncia leopard des neiges");
    });

    it("should handle null vernacular name by normalizing scientific name only", () => {
      const result = buildSearchText("Canis lupus", null);
      expect(result).toBe("canis lupus");
    });
  });
});
