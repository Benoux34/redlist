import { VALID_CATEGORIES } from "@web/hooks/use-red-list-filters/utils";
import { describe, expect, it } from "bun:test";

describe("Frontend RedList - Filter Utilities", () => {
  it("should contain all 5 threatened and extinct IUCN categories", () => {
    expect(VALID_CATEGORIES.has("EX")).toBe(true);
    expect(VALID_CATEGORIES.has("EW")).toBe(true);
    expect(VALID_CATEGORIES.has("CR")).toBe(true);
    expect(VALID_CATEGORIES.has("EN")).toBe(true);
    expect(VALID_CATEGORIES.has("VU")).toBe(true);
  });

  it("should reject non-threatened categories from filter selection", () => {
    expect(VALID_CATEGORIES.has("LC")).toBe(false);
    expect(VALID_CATEGORIES.has("NT")).toBe(false);
    expect(VALID_CATEGORIES.has("DD")).toBe(false);
    expect(VALID_CATEGORIES.has("")).toBe(false);
  });
});
