import {
  classNamesOf,
  GROUP_KEYS,
  GROUPS,
  groupWhere,
} from "@api/modules/redlist/groups";
import { describe, expect, it } from "bun:test";

describe("Sources GBIF - Taxonomic Groups & Queries", () => {
  it("should define all 8 species groups", () => {
    expect(GROUP_KEYS).toHaveLength(8);
    expect(GROUP_KEYS).toEqual([
      "mammiferes",
      "oiseaux",
      "reptiles",
      "amphibiens",
      "poissons",
      "insectes",
      "mollusques",
      "plantes",
    ]);
  });

  describe("classNamesOf", () => {
    it("should return class names for class-based groups", () => {
      expect(classNamesOf("mammiferes")).toEqual(["Mammalia"]);
      expect(classNamesOf("oiseaux")).toEqual(["Aves"]);
      expect(classNamesOf("reptiles")).toEqual([
        "Reptilia",
        "Squamata",
        "Testudines",
      ]);
      expect(classNamesOf("insectes")).toEqual(["Insecta"]);
    });

    it("should return empty array for kingdom-based groups (e.g. plantes)", () => {
      expect(classNamesOf("plantes")).toEqual([]);
      expect(GROUPS.plantes.kingdom).toBe("Plantae");
    });
  });

  describe("groupWhere", () => {
    it("should return empty filter when group is undefined", () => {
      expect(groupWhere(undefined)).toEqual({});
    });

    it("should build kingdom filter for plants", () => {
      expect(groupWhere("plantes")).toEqual({
        kingdom: "Plantae",
      });
    });

    it("should build className in filter for animals", () => {
      expect(groupWhere("mammiferes")).toEqual({
        className: { in: ["Mammalia"] },
      });

      expect(groupWhere("poissons")).toEqual({
        className: {
          in: [
            "Actinopterygii",
            "Chondrichthyes",
            "Sarcopterygii",
            "Elasmobranchii",
            "Myxini",
            "Petromyzonti",
          ],
        },
      });
    });
  });
});
