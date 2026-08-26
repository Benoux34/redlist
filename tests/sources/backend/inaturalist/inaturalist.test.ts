import {
  ALLOWED_LICENSES,
  photo,
  taxaResponse,
} from "@api/sources/inaturalist/utils";
import { describe, expect, it } from "bun:test";

describe("Sources iNaturalist - Schema & License Validation", () => {
  describe("ALLOWED_LICENSES", () => {
    it("should accept free and attribution creative commons licenses", () => {
      expect(ALLOWED_LICENSES.has("cc0")).toBe(true);
      expect(ALLOWED_LICENSES.has("cc-by")).toBe(true);
      expect(ALLOWED_LICENSES.has("cc-by-sa")).toBe(true);
      expect(ALLOWED_LICENSES.has("cc-by-nc")).toBe(true);
      expect(ALLOWED_LICENSES.has("cc-by-nc-sa")).toBe(true);
    });

    it("should reject non-free or copyrighted licenses", () => {
      expect(ALLOWED_LICENSES.has("all-rights-reserved")).toBe(false);
      expect(ALLOWED_LICENSES.has("copyright")).toBe(false);
    });
  });

  describe("photo & taxon & taxaResponse schemas", () => {
    it("should parse valid photo metadata", () => {
      const validPhoto = {
        medium_url: "https://inaturalist.org/photos/123/medium.jpg",
        square_url: "https://inaturalist.org/photos/123/square.jpg",
        license_code: "cc-by",
        attribution: "(c) John Doe, some rights reserved",
      };

      expect(photo.parse(validPhoto)).toEqual(validPhoto);
    });

    it("should parse taxa response with default_photo", () => {
      const payload = {
        results: [
          {
            id: 42,
            name: "Panthera uncia",
            preferred_common_name: "Snow Leopard",
            default_photo: {
              medium_url: "https://inaturalist.org/photo.jpg",
              license_code: "cc0",
              attribution: "Public Domain",
            },
          },
        ],
      };

      const parsed = taxaResponse.parse(payload);
      expect(parsed.results).toHaveLength(1);
      expect(parsed.results[0]?.name).toBe("Panthera uncia");
      expect(parsed.results[0]?.default_photo?.license_code).toBe("cc0");
    });
  });
});
