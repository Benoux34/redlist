import { describe, expect, it } from "bun:test";
import { buildCountryCounts } from "@api/modules/redlist/service/utils";
import type { CountryCategoryRow } from "@api/modules/redlist/service/utils";

const rows: CountryCategoryRow[] = [
  { countryCode: "MG", categoryCode: "CR", count: 700 },
  { countryCode: "MG", categoryCode: "EN", count: 200 },
  { countryCode: "MG", categoryCode: "EX", count: 30 },
  { countryCode: "FR", categoryCode: "CR", count: 40 },
  { countryCode: "FR", categoryCode: "VU", count: 60 },
];

describe("Backend RedList - Country Counts", () => {
  it("should pivot flat rows into one entry per country", () => {
    const result = buildCountryCounts(rows);

    expect(result).toHaveLength(2);
    expect(result[0]?.countryCode).toBe("MG");
    expect(result[0]?.counts).toEqual({ EX: 30, EW: 0, CR: 700, EN: 200, VU: 0 });
  });

  it("should count only CR, EN and VU as threatened", () => {
    const [madagascar] = buildCountryCounts(rows);

    expect(madagascar?.threatened).toBe(900);
  });

  it("should rank countries by threatened count, highest first", () => {
    const result = buildCountryCounts(rows);

    expect(result.map((entry) => [entry.countryCode, entry.rank])).toEqual([
      ["MG", 1],
      ["FR", 2],
    ]);
  });

  it("should give tied countries the same rank and skip the next", () => {
    const tied: CountryCategoryRow[] = [
      { countryCode: "AA", categoryCode: "CR", count: 10 },
      { countryCode: "BB", categoryCode: "CR", count: 10 },
      { countryCode: "CC", categoryCode: "CR", count: 5 },
    ];

    expect(buildCountryCounts(tied).map((e) => [e.countryCode, e.rank])).toEqual(
      [
        ["AA", 1],
        ["BB", 1],
        ["CC", 3],
      ],
    );
  });

  it("should uppercase country codes", () => {
    const result = buildCountryCounts([
      { countryCode: "mg", categoryCode: "CR", count: 1 },
    ]);

    expect(result[0]?.countryCode).toBe("MG");
  });

  it("should ignore categories outside the five kept ones", () => {
    const result = buildCountryCounts([
      { countryCode: "FR", categoryCode: "LC", count: 999 },
      { countryCode: "FR", categoryCode: "CR", count: 3 },
    ]);

    expect(result[0]?.counts).toEqual({ EX: 0, EW: 0, CR: 3, EN: 0, VU: 0 });
    expect(result[0]?.threatened).toBe(3);
  });

  it("should return an empty list when there is no location data", () => {
    expect(buildCountryCounts([])).toEqual([]);
  });
});
