import { describe, expect, it } from "bun:test";
import { normalizeCountryCode, translateCountry } from "@web/lib/country";

describe("Frontend RedList - Country Codes", () => {
  it("should accept a valid code in any case and return it uppercased", () => {
    expect(normalizeCountryCode("fr")).toBe("FR");
    expect(normalizeCountryCode("Mg")).toBe("MG");
  });

  it("should reject anything that is not two letters", () => {
    expect(normalizeCountryCode("FRA")).toBeNull();
    expect(normalizeCountryCode("1")).toBeNull();
    expect(normalizeCountryCode("")).toBeNull();
    expect(normalizeCountryCode(undefined)).toBeNull();
  });

  it("should reject two letters that are not a real region", () => {
    expect(normalizeCountryCode("ZZ")).toBeNull();
    expect(normalizeCountryCode("XX")).toBeNull();
  });

  it("should translate codes into French country names", () => {
    expect(translateCountry("FR", "FR")).toBe("France");
    expect(translateCountry("MG", "MG")).toBe("Madagascar");
    expect(translateCountry("BR", "BR")).toBe("Brésil");
  });

  it("should fall back when the code cannot be translated", () => {
    expect(translateCountry("ZZ", "inconnu")).toBe("inconnu");
    expect(translateCountry(null, "inconnu")).toBe("inconnu");
  });
});
