import { favoriteList } from "@app/contracts";
import { describe, expect, it } from "bun:test";

describe("Backend Favorite - Service Mapping & Status Tracking", () => {
  const mockBaseAssessment = {
    assessmentId: 404,
    scientificName: "Canis lupus",
    vernacularNameFr: "Loup gris",
    categoryCode: "VU" as const,
    description: "Grand canidé.",
    descriptionSource: "Wikipedia",
    photoUrl: "https://example.com/wolf.jpg",
    photoAttribution: "Wildlife Photo",
    photoLicense: "CC-BY",
    yearPublished: 2022,
    possiblyExtinct: false,
    officialUrl: "https://iucnredlist.org/species/404",
  };

  it("should accurately detect when a species IUCN category has NOT changed", () => {
    const rawDbRow = {
      createdAt: new Date("2026-01-15T12:00:00.000Z"),
      categoryAtAdd: "VU",
      assessment: mockBaseAssessment,
    };

    const mappedItem = {
      ...rawDbRow.assessment,
      followedAt: rawDbRow.createdAt.toISOString(),
      categoryAtAdd: rawDbRow.categoryAtAdd,
      categoryChanged: rawDbRow.categoryAtAdd !== rawDbRow.assessment.categoryCode,
    };

    const validatedList = favoriteList.parse({
      items: [mappedItem],
      total: 1,
    });

    expect(validatedList.items[0]?.categoryChanged).toBe(false);
    expect(validatedList.items[0]?.categoryAtAdd).toBe("VU");
    expect(validatedList.items[0]?.categoryCode).toBe("VU");
  });

  it("should accurately detect when a species IUCN status has changed (e.g. worsened from VU to EN)", () => {
    const rawDbRow = {
      createdAt: new Date("2025-06-10T08:30:00.000Z"),
      categoryAtAdd: "VU",
      assessment: {
        ...mockBaseAssessment,
        categoryCode: "EN" as const,
      },
    };

    const mappedItem = {
      ...rawDbRow.assessment,
      followedAt: rawDbRow.createdAt.toISOString(),
      categoryAtAdd: rawDbRow.categoryAtAdd,
      categoryChanged: rawDbRow.categoryAtAdd !== rawDbRow.assessment.categoryCode,
    };

    const validatedList = favoriteList.parse({
      items: [mappedItem],
      total: 1,
    });

    expect(validatedList.items[0]?.categoryChanged).toBe(true);
    expect(validatedList.items[0]?.categoryAtAdd).toBe("VU");
    expect(validatedList.items[0]?.categoryCode).toBe("EN");
  });
});
