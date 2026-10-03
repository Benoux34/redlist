import type { FavoriteList } from "@app/contracts";
import { formatFollowedSpecies } from "@api/modules/mcp/service/tools/utils";
import { describe, expect, it } from "bun:test";

const ORIGIN = "https://redlist.dedyn.io";

const species = {
  assessmentId: 123,
  scientificName: "Panthera tigris",
  vernacularNameFr: "Tigre",
  categoryCode: "EN" as const,
  description: null,
  descriptionSource: null,
  photoUrl: null,
  photoAttribution: null,
  photoLicense: null,
  yearPublished: 2022,
  possiblyExtinct: false,
  officialUrl: null,
  followedAt: "2026-09-12T10:00:00.000Z",
  categoryAtAdd: "EN" as const,
  categoryChanged: false,
};

describe("MCP - followed species tool", () => {
  it("should say so when nothing is followed", () => {
    expect(formatFollowedSpecies({ items: [], total: 0 }, ORIGIN)).toBe(
      "Vous ne suivez encore aucune espèce sur Redlist.",
    );
  });

  it("should list each species with its status, date and link", () => {
    const text = formatFollowedSpecies({ items: [species], total: 1 }, ORIGIN);

    expect(text).toStartWith("1 espèce suivie :");
    expect(text).toContain("Tigre (Panthera tigris) : En danger d'extinction");
    expect(text).toContain("suivie depuis le 12 septembre 2026");
    expect(text).toContain(`${ORIGIN}/species/123`);
    expect(text).not.toContain("Statut modifié");
  });

  it("should fall back to the Latin name and flag a status change", () => {
    const favorites: FavoriteList = {
      items: [
        {
          ...species,
          vernacularNameFr: null,
          categoryCode: "CR",
          categoryChanged: true,
        },
        { ...species, assessmentId: 456 },
      ],
      total: 2,
    };
    const text = formatFollowedSpecies(favorites, ORIGIN);

    expect(text).toStartWith("2 espèces suivies :");
    expect(text).toContain(
      "- Panthera tigris : En danger critique d'extinction",
    );
    expect(text).toContain(
      "Statut modifié depuis le début du suivi (avant : En danger d'extinction).",
    );
  });
});
