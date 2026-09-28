import {
  NAV_GROUPS,
  isGroupActive,
} from "@web/components/layout/main-layout/header/utils";
import { describe, expect, it } from "bun:test";

const [redList, education] = NAV_GROUPS;

describe("Frontend Layout - Navigation groups", () => {
  it("should expose the red list and education sections", () => {
    expect(NAV_GROUPS.map((group) => group.label)).toEqual([
      "Explorer",
      "Comprendre",
    ]);
  });

  it("should mark a section active on its pages and their sub-pages", () => {
    if (redList === undefined || education === undefined)
      throw new Error("missing nav groups");

    expect(isGroupActive("/threatened-species", redList)).toBe(true);
    expect(isGroupActive("/species/12345", redList)).toBe(true);
    expect(isGroupActive("/pays/de", redList)).toBe(true);
    expect(isGroupActive("/agir", education)).toBe(true);
  });

  it("should not match unrelated pages or shared prefixes", () => {
    if (redList === undefined || education === undefined)
      throw new Error("missing nav groups");

    expect(isGroupActive("/", redList)).toBe(false);
    expect(isGroupActive("/account", education)).toBe(false);
    expect(isGroupActive("/speciesx", redList)).toBe(false);
    expect(isGroupActive("/agir", redList)).toBe(false);
  });

  it("should list every link inside its own section", () => {
    for (const group of NAV_GROUPS)
      for (const link of group.links)
        expect(isGroupActive(link.to, group)).toBe(true);
  });
});
