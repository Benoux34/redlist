import { describe, expect, it } from "bun:test";
import { parseCategories } from "@api/ingestion/seed-assessments/utils";

describe("Backend Ingestion - Seed categories", () => {
  it("should seed everything when no category is given", () => {
    expect(parseCategories(undefined)).toBeNull();
    expect(parseCategories("--force")).toBeNull();
  });

  it("should accept one or several categories, in any case", () => {
    expect(parseCategories("EN")).toEqual(["EN"]);
    expect(parseCategories("cr,en")).toEqual(["CR", "EN"]);
  });

  it("should reject unknown categories instead of seeding nothing", () => {
    expect(() => parseCategories("EN,LC")).toThrow("Unknown categories: LC");
  });
});
