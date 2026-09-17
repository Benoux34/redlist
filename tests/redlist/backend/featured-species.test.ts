import { describe, expect, it } from "bun:test";
import {
  FEATURED_SPECIES,
  orderFeatured,
  pickForDay,
} from "@api/modules/redlist/featured/utils";

const DAY = 86_400_000;

const row = (scientificName: string, photoUrl: string | null = "p.jpg") => ({
  scientificName,
  vernacularNameFr: "Nom brut (oiseau)",
  photoUrl,
});

describe("Backend RedList - Featured Species", () => {
  it("should list each curated species only once", () => {
    const names = FEATURED_SPECIES.map((entry) => entry.scientificName);

    expect(new Set(names).size).toBe(names.length);
  });

  it("should keep curated order and drop species missing from the database", () => {
    const ordered = orderFeatured([
      row("Thylacinus cynocephalus"),
      row("Espèce inconnue"),
      row("Raphus cucullatus"),
    ]);

    expect(ordered.map((entry) => entry.scientificName)).toEqual([
      "Raphus cucullatus",
      "Thylacinus cynocephalus",
    ]);
  });

  it("should replace the raw name with the curated French name", () => {
    const [dodo] = orderFeatured([row("Raphus cucullatus")]);

    expect(dodo?.vernacularNameFr).toBe("Dodo");
  });

  it("should keep a single row when a species appears twice", () => {
    expect(
      orderFeatured([row("Raphus cucullatus"), row("Raphus cucullatus")]),
    ).toHaveLength(1);
  });

  it("should rotate through species day after day", () => {
    const pool = [row("A"), row("B"), row("C")];

    expect(pickForDay(pool, 0, DAY)?.scientificName).toBe("A");
    expect(pickForDay(pool, DAY, DAY)?.scientificName).toBe("B");
    expect(pickForDay(pool, 3 * DAY, DAY)?.scientificName).toBe("A");
  });

  it("should stay on the same species for the whole day", () => {
    const pool = [row("A"), row("B")];

    expect(pickForDay(pool, DAY + 1, DAY)).toEqual(
      pickForDay(pool, 2 * DAY - 1, DAY),
    );
  });

  it("should prefer species that have a photo", () => {
    const pool = [row("Sans photo", null), row("Avec photo")];

    expect(pickForDay(pool, 0, DAY)?.scientificName).toBe("Avec photo");
    expect(pickForDay(pool, DAY, DAY)?.scientificName).toBe("Avec photo");
  });

  it("should fall back to species without photo rather than show nothing", () => {
    expect(pickForDay([row("Sans photo", null)], 0, DAY)?.scientificName).toBe(
      "Sans photo",
    );
  });

  it("should return null when no curated species is in the database", () => {
    expect(pickForDay([], 0, DAY)).toBeNull();
  });
});
