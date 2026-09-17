import { describe, expect, it } from "bun:test";
import type { RedListCountryCount } from "@app/contracts";
import {
  NO_DATA_COLOR,
  buildCountryValues,
  buildScale,
  countrySearch,
  scaleColor,
} from "@web/pages/planet/utils";

const entry = (
  countryCode: string,
  CR: number,
  EX: number,
): RedListCountryCount => ({
  countryCode,
  counts: { EX, EW: 0, CR, EN: 0, VU: 0 },
  threatened: CR,
  rank: 1,
});

describe("Frontend Planet - Map scale", () => {
  it("should pick the value matching the selected status", () => {
    const counts = [entry("mg", 700, 30), entry("FR", 40, 0)];

    expect(buildCountryValues(counts, "threatened").get("MG")).toBe(700);
    expect(buildCountryValues(counts, "EX").get("MG")).toBe(30);
    expect(buildCountryValues(counts, "EX").get("FR")).toBe(0);
  });

  it("should build five increasing steps starting at one", () => {
    const scale = buildScale(Array.from({ length: 100 }, (_, i) => i * 37));

    expect(scale).toHaveLength(5);
    expect(scale[0]?.min).toBe(1);
    expect(scale.map((step) => step.min)).toEqual(
      scale.map((step) => step.min).sort((a, b) => a - b),
    );
    expect(new Set(scale.map((step) => step.min)).size).toBe(5);
  });

  it("should collapse duplicate steps and keep the darkest colors", () => {
    const scale = buildScale([1, 1, 1, 1, 2]);

    expect(scale.map((step) => step.min)).toEqual([1]);
    expect(scale[0]?.color).toBe("#a52a24");
  });

  it("should return no step when every value is zero", () => {
    expect(buildScale([0, 0])).toEqual([]);
  });

  it("should color zero and unknown countries as empty", () => {
    const scale = buildScale([1, 10, 100, 1000, 5000]);

    expect(scaleColor(scale, undefined)).toBe(NO_DATA_COLOR);
    expect(scaleColor(scale, 0)).toBe(NO_DATA_COLOR);
    expect(scaleColor(scale, 100_000)).toBe("#a52a24");
  });

  it("should forward active filters to the country page", () => {
    expect(countrySearch({ status: "threatened", group: null })).toBe("");
    expect(countrySearch({ status: "CR", group: "oiseaux" })).toBe(
      "?category=CR&group=oiseaux",
    );
  });
});
