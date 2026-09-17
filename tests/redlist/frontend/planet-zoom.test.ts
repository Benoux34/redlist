import { describe, expect, it } from "bun:test";
import { clampCenter, zoomedViewBox } from "@web/pages/planet/world-map/utils";

const bounds = { x: 0, y: 0, width: 400, height: 200 };

describe("Frontend Planet - Map zoom", () => {
  it("should show the whole map at zoom 1 whatever the center", () => {
    expect(zoomedViewBox(bounds, 1, { x: 999, y: -999 })).toBe("0 0 400 200");
  });

  it("should shrink the view around the center when zooming in", () => {
    expect(zoomedViewBox(bounds, 2, { x: 200, y: 100 })).toBe("100 50 200 100");
  });

  it("should keep the view inside the map when panning past an edge", () => {
    expect(clampCenter(bounds, 4, { x: -50, y: 500 })).toEqual({
      x: 50,
      y: 175,
    });
  });
});
