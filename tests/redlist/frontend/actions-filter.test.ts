import { describe, expect, it } from "bun:test";
import type { GestureDomain } from "@web/components/gestures/entities";
import {
  countByCause,
  countGestures,
  filterDomains,
  parseCause,
} from "@web/pages/actions/utils";

const icon = (() => null) as never;

const domains: GestureDomain[] = [
  {
    label: "Au jardin",
    gestures: [
      {
        title: "Sans pesticides",
        description: "",
        icon,
        threat: "pollution",
      },
      {
        title: "Coin sauvage",
        description: "",
        icon,
        threat: "habitat",
      },
    ],
  },
  {
    label: "En participant",
    gestures: [{ title: "Signaler", description: "", icon, threat: null }],
  },
];

describe("Frontend RedList - Actions Filter", () => {
  it("should accept a known cause from the URL", () => {
    expect(parseCause("pollution")).toBe("pollution");
  });

  it("should ignore missing or unknown causes", () => {
    expect(parseCause(null)).toBeNull();
    expect(parseCause("volcan")).toBeNull();
    expect(parseCause("")).toBeNull();
  });

  it("should return every domain when no cause is selected", () => {
    expect(filterDomains(domains, null)).toHaveLength(2);
  });

  it("should keep only the gestures that act on the selected cause", () => {
    const result = filterDomains(domains, "pollution");

    expect(result).toHaveLength(1);
    expect(result[0]?.gestures.map((gesture) => gesture.title)).toEqual([
      "Sans pesticides",
    ]);
  });

  it("should drop domains left empty by the filter", () => {
    expect(
      filterDomains(domains, "habitat").map((domain) => domain.label),
    ).toEqual(["Au jardin"]);
  });

  it("should count gestures per cause, skipping those without one", () => {
    const counts = countByCause(domains);

    expect(counts.pollution).toBe(1);
    expect(counts.habitat).toBe(1);
    expect(counts.climate).toBe(0);
  });

  it("should count every gesture, including those without a cause", () => {
    expect(countGestures(domains)).toBe(3);
  });
});
