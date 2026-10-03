import {
  hashToken,
  pkceChallenge,
  randomToken,
  redirectWith,
} from "@api/modules/oauth/service/utils";
import { describe, expect, it } from "bun:test";

describe("OAuth - utils", () => {
  it("should generate distinct URL-safe random tokens", () => {
    const token = randomToken();

    expect(token).toMatch(/^[A-Za-z0-9_-]{43}$/);
    expect(randomToken()).not.toBe(token);
  });

  it("should hash tokens deterministically as SHA-256 hex", () => {
    expect(hashToken("abc")).toBe(hashToken("abc"));
    expect(hashToken("abc")).toMatch(/^[a-f0-9]{64}$/);
  });

  it("should add parameters to the redirect URI and keep its own query", () => {
    const url = new URL(
      redirectWith("https://chatgpt.com/cb?callback=42", {
        code: "XYZ",
        state: "s1",
        iss: "https://redlist.dedyn.io",
        error: undefined,
      }),
    );

    expect(url.searchParams.get("callback")).toBe("42");
    expect(url.searchParams.get("code")).toBe("XYZ");
    expect(url.searchParams.get("state")).toBe("s1");
    expect(url.searchParams.get("iss")).toBe("https://redlist.dedyn.io");
    expect(url.searchParams.has("error")).toBe(false);
  });
  it("should compute the PKCE S256 challenge of RFC 7636", () => {
    expect(pkceChallenge("dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk")).toBe(
      "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM",
    );
  });
});
