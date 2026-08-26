import { favoriteState } from "@app/contracts";
import { describe, expect, it } from "bun:test";

describe("Frontend Favorite - State & Toggle Logic", () => {
  it("should validate active favorite state response", () => {
    const active = favoriteState.parse({ isFavorite: true });
    expect(active.isFavorite).toBe(true);
  });

  it("should validate inactive favorite state response", () => {
    const inactive = favoriteState.parse({ isFavorite: false });
    expect(inactive.isFavorite).toBe(false);
  });

  it("should simulate optimistic toggle and rollback on network failure", () => {
    let isFavorite = false;
    let isPending = false;

    isPending = true;
    const next = !isFavorite;
    isFavorite = next;

    expect(isFavorite).toBe(true);
    expect(isPending).toBe(true);

    const hasFailed = true;
    if (hasFailed) isFavorite = !next;

    isPending = false;

    expect(isFavorite).toBe(false);
    expect(isPending).toBe(false);
  });
});
