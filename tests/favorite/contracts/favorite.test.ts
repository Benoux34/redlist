import { describe, expect, it } from "bun:test";
import {
  favoriteItem,
  favoriteList,
  favoriteState,
} from "@app/contracts";

describe("Contracts - Favorite Outputs", () => {
  const sampleFavorite = {
    assessmentId: 1001,
    scientificName: "Panthera uncia",
    vernacularNameFr: "Léopard des neiges",
    categoryCode: "VU" as const,
    description: "Espèce vulnérable.",
    descriptionSource: "Wikipedia",
    photoUrl: "https://example.com/photo.jpg",
    photoAttribution: "Photographe",
    photoLicense: "CC-BY",
    yearPublished: 2020,
    possiblyExtinct: false,
    officialUrl: "https://iucnredlist.org/species/1001",
    followedAt: "2026-08-26T08:00:00.000Z",
    categoryAtAdd: "VU" as const,
    categoryChanged: false,
  };

  it("should validate a valid favoriteItem", () => {
    expect(favoriteItem.parse(sampleFavorite)).toEqual(sampleFavorite);
  });

  it("should validate when category has changed", () => {
    const updatedCategoryFavorite = {
      ...sampleFavorite,
      categoryCode: "EN" as const,
      categoryAtAdd: "VU" as const,
      categoryChanged: true,
    };
    expect(favoriteItem.parse(updatedCategoryFavorite)).toEqual(
      updatedCategoryFavorite,
    );
  });

  it("should reject invalid ISO date for followedAt", () => {
    expect(() =>
      favoriteItem.parse({
        ...sampleFavorite,
        followedAt: "not-a-date",
      }),
    ).toThrow();
  });

  it("should validate favoriteList schema", () => {
    const list = {
      items: [sampleFavorite],
      total: 1,
    };
    expect(favoriteList.parse(list)).toEqual(list);
  });

  it("should validate favoriteState schema", () => {
    expect(favoriteState.parse({ isFavorite: true })).toEqual({
      isFavorite: true,
    });
    expect(favoriteState.parse({ isFavorite: false })).toEqual({
      isFavorite: false,
    });
    expect(() => favoriteState.parse({ isFavorite: "true" })).toThrow();
  });
});
