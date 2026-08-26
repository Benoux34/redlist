import {
  SEARCH_ALIASES,
  aliasFor,
} from "@api/sources/gbif/search-aliases";
import { describe, expect, it } from "bun:test";

describe("Sources GBIF - Search Aliases Resolution", () => {
  it("should define a rich dictionary of common search terms", () => {
    expect(Object.keys(SEARCH_ALIASES).length).toBeGreaterThanOrEqual(30);
  });

  describe("aliasFor", () => {
    it("should resolve exact singular aliases", () => {
      expect(aliasFor("grenouille")).toBe("amphibiens");
      expect(aliasFor("requin")).toBe("poissons");
      expect(aliasFor("dauphin")).toBe("mammiferes");
      expect(aliasFor("aigle")).toBeNull(); // not an alias
      expect(aliasFor("rapace")).toBe("oiseaux");
      expect(aliasFor("fleur")).toBe("plantes");
      expect(aliasFor("papillon")).toBe("insectes");
      expect(aliasFor("escargot")).toBe("mollusques");
    });

    it("should resolve plural aliases automatically", () => {
      expect(aliasFor("requins")).toBe("poissons");
      expect(aliasFor("grenouilles")).toBe("amphibiens");
      expect(aliasFor("arbres")).toBe("plantes");
      expect(aliasFor("oiseaux")).toBe("oiseaux");
    });

    it("should be case-insensitive and ignore accents, spaces and hyphens", () => {
      expect(aliasFor("  REQUIN  ")).toBe("poissons");
      expect(aliasFor("Chauve-souris")).toBe("mammiferes");
      expect(aliasFor("chauve souris")).toBe("mammiferes");
      expect(aliasFor("lézard")).toBe("reptiles");
      expect(aliasFor("orchidée")).toBe("plantes");
    });

    it("should return null for unmatched keywords", () => {
      expect(aliasFor("ordinateur")).toBeNull();
      expect(aliasFor("inconnu")).toBeNull();
      expect(aliasFor("")).toBeNull();
    });
  });
});
