import { USER_SELECT } from "@api/modules/auth/constants";
import {
  LOGIN_LIMIT,
  REGISTER_LIMIT,
  USER_AGENT_HEADER,
} from "@api/modules/auth/routes/utils";
import { describe, expect, it } from "bun:test";

describe("Backend Auth - Route Configurations & Constants", () => {
  describe("Rate Limiting Configurations", () => {
    it("should configure login rate limit (10 attempts per 15 min)", () => {
      expect(LOGIN_LIMIT.limit).toBe(10);
      expect(LOGIN_LIMIT.windowMs).toBe(15 * 60 * 1000);
      expect(LOGIN_LIMIT.keyPrefix).toBe("login");
    });

    it("should configure register rate limit (5 attempts per hour)", () => {
      expect(REGISTER_LIMIT.limit).toBe(5);
      expect(REGISTER_LIMIT.windowMs).toBe(60 * 60 * 1000);
      expect(REGISTER_LIMIT.keyPrefix).toBe("register");
    });
  });

  describe("Headers & Projections", () => {
    it("should use standard user-agent header name", () => {
      expect(USER_AGENT_HEADER).toBe("user-agent");
    });

    it("should safely select only non-sensitive user fields (excluding passwordHash)", () => {
      expect(USER_SELECT).toEqual({
        id: true,
        pseudo: true,
        email: true,
        createdAt: true,
      });
      expect("passwordHash" in USER_SELECT).toBe(false);
    });
  });
});
