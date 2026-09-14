import { describe, expect, it } from "bun:test";
import { pickFrenchName } from "@api/sources/gbif/vernacular-names/pick";

describe("Backend RedList - GBIF French Name Selection", () => {
  it("should return null when GBIF has no French entry", () => {
    expect(pickFrenchName([])).toBeNull();
  });

  it("should prefer the entry GBIF flags as preferred", () => {
    expect(
      pickFrenchName([
        { vernacularName: "Autre nom" },
        { vernacularName: "Nom retenu", preferred: true },
      ]),
    ).toBe("Nom retenu");
  });

  it("should pick the most repeated name across datasets", () => {
    expect(
      pickFrenchName([
        { vernacularName: "Bois Tambour" },
        { vernacularName: "Nom rare" },
        { vernacularName: "Bois Tambour" },
      ]),
    ).toBe("Bois Tambour");
  });

  it("should count case variants together and keep the first spelling seen", () => {
    expect(
      pickFrenchName([
        { vernacularName: "Bois Tambour" },
        { vernacularName: "BOIS TAMBOUR" },
        { vernacularName: "Nom unique" },
      ]),
    ).toBe("Bois Tambour");
  });

  it("should trim surrounding whitespace", () => {
    expect(pickFrenchName([{ vernacularName: "  Koto  " }])).toBe("Koto");
  });

  it("should ignore blank names", () => {
    expect(
      pickFrenchName([{ vernacularName: "   " }, { vernacularName: "Koto" }]),
    ).toBe("Koto");
  });

  it("should return null when every name is blank", () => {
    expect(pickFrenchName([{ vernacularName: "  " }])).toBeNull();
  });
});
