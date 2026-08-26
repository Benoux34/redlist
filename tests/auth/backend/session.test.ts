import {
  SESSION_RENEWAL_THRESHOLD_MS,
  SESSION_TTL_MS,
  TOKEN_BYTES,
  USER_AGENT_MAX_LENGTH,
  generateSessionToken,
  hashSessionToken,
} from "@api/modules/auth/session/utils";
import { describe, expect, it } from "bun:test";

describe("Backend Auth - Session Utilities", () => {
  describe("generateSessionToken", () => {
    it("should generate a URL-safe base64 string from 32 cryptographically secure bytes", () => {
      const token1 = generateSessionToken();
      const token2 = generateSessionToken();

      expect(typeof token1).toBe("string");
      expect(token1).not.toBe(token2);
      expect(token1.length).toBeGreaterThanOrEqual(43);
      expect(/^[A-Za-z0-9_-]+$/.test(token1)).toBe(true);
    });
  });

  describe("hashSessionToken", () => {
    it("should generate a 64-character hex SHA-256 digest", () => {
      const token = "dummy-token-value-12345";
      const hash = hashSessionToken(token);

      expect(typeof hash).toBe("string");
      expect(hash).toHaveLength(64);
      expect(/^[a-f0-9]{64}$/.test(hash)).toBe(true);
    });

    it("should be deterministic for the same token", () => {
      const token = "my-secret-session-token";
      const hash1 = hashSessionToken(token);
      const hash2 = hashSessionToken(token);

      expect(hash1).toBe(hash2);
    });

    it("should generate distinct hashes for different tokens", () => {
      const hash1 = hashSessionToken("token-a");
      const hash2 = hashSessionToken("token-b");

      expect(hash1).not.toBe(hash2);
    });
  });

  describe("Session Constants & Security Thresholds", () => {
    it("should enforce a 30-day session TTL", () => {
      const expectedTtl = 1000 * 60 * 60 * 24 * 30;
      expect(SESSION_TTL_MS).toBe(expectedTtl);
    });

    it("should set renewal threshold to half of session TTL (15 days)", () => {
      expect(SESSION_RENEWAL_THRESHOLD_MS).toBe(SESSION_TTL_MS / 2);
    });

    it("should require 32 bytes of token entropy", () => {
      expect(TOKEN_BYTES).toBe(32);
    });

    it("should truncate user agent to 255 characters", () => {
      expect(USER_AGENT_MAX_LENGTH).toBe(255);
    });
  });
});
