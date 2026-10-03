import { isAllowedRedirectUri } from "@api/modules/oauth/service/utils";
import { describe, expect, it } from "bun:test";

describe("OAuth - redirect URI validation", () => {
  it("should accept HTTPS callbacks such as ChatGPT's", () => {
    expect(
      isAllowedRedirectUri(
        "https://chatgpt.com/connector_platform_oauth_redirect",
      ),
    ).toBe(true);
  });

  it("should accept plain HTTP only for local tools", () => {
    expect(isAllowedRedirectUri("http://localhost:6274/oauth/callback")).toBe(
      true,
    );
    expect(isAllowedRedirectUri("http://127.0.0.1:6274/callback")).toBe(true);
    expect(isAllowedRedirectUri("http://evil.example.com/callback")).toBe(
      false,
    );
  });

  it("should reject fragments, other schemes and garbage", () => {
    expect(isAllowedRedirectUri("https://chatgpt.com/callback#token")).toBe(
      false,
    );
    expect(isAllowedRedirectUri("javascript:alert(1)")).toBe(false);
    expect(isAllowedRedirectUri("not a url")).toBe(false);
  });
});
