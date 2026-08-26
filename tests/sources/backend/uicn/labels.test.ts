import {
  translateCountry,
  translateHabitatFamily,
  translateImpact,
  translateOrigin,
  translatePopulationTrend,
  translatePresence,
  translateSeverity,
  translateSystem,
  translateThreatFamily,
  translateTiming,
} from "@api/sources/uicn/labels";
import { describe, expect, it } from "bun:test";

describe("Sources UICN - French Localization & Translation", () => {
  describe("translatePopulationTrend", () => {
    it("should translate IUCN population trends to French", () => {
      expect(translatePopulationTrend("Decreasing")).toBe("En déclin");
      expect(translatePopulationTrend("Increasing")).toBe("En augmentation");
      expect(translatePopulationTrend("Stable")).toBe("Stable");
      expect(translatePopulationTrend("Unknown")).toBe("Inconnue");
      expect(translatePopulationTrend(null)).toBeNull();
    });
  });

  describe("translateSystem", () => {
    it("should translate ecosystems", () => {
      expect(translateSystem("Terrestrial")).toBe("Terrestre");
      expect(translateSystem("Marine")).toBe("Marin");
      expect(translateSystem("Freshwater (=Inland waters)")).toBe("Eau douce");
      expect(translateSystem("Other")).toBe("Other"); // fallback
    });
  });

  describe("translatePresence & translateOrigin", () => {
    it("should translate presence status", () => {
      expect(translatePresence("Extant")).toBe("Présente");
      expect(translatePresence("Possibly Extinct")).toBe(
        "Probablement disparue",
      );
      expect(translatePresence(null)).toBeNull();
    });

    it("should translate origin status", () => {
      expect(translateOrigin("Native")).toBe("Indigène");
      expect(translateOrigin("Introduced")).toBe("Introduite");
      expect(translateOrigin(null)).toBeNull();
    });
  });

  describe("translateTiming & translateSeverity & translateImpact", () => {
    it("should translate timing, severity and impact labels", () => {
      expect(translateTiming("Ongoing")).toBe("En cours");
      expect(translateTiming("Past, Unlikely to Return")).toBe(
        "Passée, peu susceptible de revenir",
      );

      expect(translateSeverity("Rapid Declines")).toBe("Déclin rapide");
      expect(translateSeverity("Negligible declines")).toBe(
        "Déclin négligeable",
      );

      expect(translateImpact("High Impact")).toBe("Impact élevé");
      expect(translateImpact("Low Impact")).toBe("Impact faible");
    });
  });

  describe("translateThreatFamily & translateHabitatFamily", () => {
    it("should translate IUCN threat classification codes", () => {
      expect(translateThreatFamily("5")).toBe(
        "Exploitation des ressources biologiques",
      );
      expect(translateThreatFamily("2")).toBe("Agriculture et aquaculture");
      expect(translateThreatFamily("1")).toBe("Urbanisation");
      expect(translateThreatFamily(null)).toBeNull();
    });

    it("should translate IUCN habitat classification codes with fallback", () => {
      expect(translateHabitatFamily("1", "Forêt par défaut")).toBe("Forêt");
      expect(translateHabitatFamily("5", "Milieux humides par défaut")).toBe(
        "Zones humides continentales",
      );
      expect(translateHabitatFamily(null, "Fallback")).toBe("Fallback");
    });
  });

  describe("translateCountry", () => {
    it("should translate ISO country codes to French country names", () => {
      expect(translateCountry("FR", "France")).toBe("France");
      expect(translateCountry("MG", "Madagascar")).toBe("Madagascar");
      expect(translateCountry("XX", "Fallback")).toBe("Fallback");
      expect(translateCountry(null, "Fallback")).toBe("Fallback");
    });
  });
});
