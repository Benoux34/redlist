import { assessmentParams } from "@api/modules/favorite/routes/utils";
import { ASSESSMENT_SELECT } from "@api/modules/favorite/service/utils";
import { describe, expect, it } from "bun:test";

describe("Backend Favorite - Route Configurations & Projections", () => {
  describe("assessmentParams", () => {
    it("should validate and coerce positive integer assessmentId", () => {
      expect(assessmentParams.parse({ assessmentId: "1234" })).toEqual({
        assessmentId: 1234,
      });
      expect(assessmentParams.parse({ assessmentId: 5678 })).toEqual({
        assessmentId: 5678,
      });
    });

    it("should reject invalid or non-positive assessmentId", () => {
      expect(() => assessmentParams.parse({ assessmentId: "0" })).toThrow();
      expect(() => assessmentParams.parse({ assessmentId: "-5" })).toThrow();
      expect(() =>
        assessmentParams.parse({ assessmentId: "not-a-number" }),
      ).toThrow();
    });
  });

  describe("ASSESSMENT_SELECT Projection", () => {
    it("should include all required fields for favorite listings", () => {
      expect(ASSESSMENT_SELECT).toEqual({
        assessmentId: true,
        scientificName: true,
        vernacularNameFr: true,
        categoryCode: true,
        description: true,
        descriptionSource: true,
        photoUrl: true,
        photoAttribution: true,
        photoLicense: true,
        yearPublished: true,
        possiblyExtinct: true,
        officialUrl: true,
      });
    });
  });
});
