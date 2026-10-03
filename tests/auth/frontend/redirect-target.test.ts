import { redirectTarget } from "@web/pages/auth/login/form/utils";
import { describe, expect, it } from "bun:test";

describe("Frontend Auth - redirectTarget", () => {
  it("should go back to the page and keep its query string", () => {
    expect(
      redirectTarget({
        from: {
          pathname: "/oauth/authorize",
          search: "?client_id=abc&state=s",
        },
      }),
    ).toBe("/oauth/authorize?client_id=abc&state=s");
  });

  it("should fall back to the account page", () => {
    expect(redirectTarget(null)).toBe("/account");
    expect(redirectTarget({ from: "nope" })).toBe("/account");
    expect(redirectTarget({ from: { pathname: "/agir" } })).toBe("/agir");
  });
});
