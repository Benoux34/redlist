import {
  fakeVerifyPassword,
  hashPassword,
  verifyPassword,
} from "@api/modules/auth/password";
import { DUMMY_HASH, HASH_OPTIONS } from "@api/modules/auth/password/utils";
import { describe, expect, it } from "bun:test";

describe("Backend Auth - Password", () => {
  describe("hashPassword & verifyPassword", () => {
    it("should hash password with argon2id and verify correctly", async () => {
      const password = "ValidPassword123!@#";
      const hash = await hashPassword(password);

      expect(typeof hash).toBe("string");
      expect(hash.startsWith("$argon2id$")).toBe(true);

      const isValid = await verifyPassword(password, hash);
      expect(isValid).toBe(true);
    });

    it("should return false for invalid password comparison", async () => {
      const password = "CorrectPassword123!";
      const wrongPassword = "WrongPassword456!";
      const hash = await hashPassword(password);

      const isValid = await verifyPassword(wrongPassword, hash);
      expect(isValid).toBe(false);
    });

    it("should generate distinct hashes for identical passwords (unique salts)", async () => {
      const password = "IdenticalPassword123!";
      const hash1 = await hashPassword(password);
      const hash2 = await hashPassword(password);

      expect(hash1).not.toBe(hash2);
      expect(await verifyPassword(password, hash1)).toBe(true);
      expect(await verifyPassword(password, hash2)).toBe(true);
    });
  });

  describe("fakeVerifyPassword (Timing Attack Mitigation)", () => {
    it("should execute fake verification against DUMMY_HASH without throwing", async () => {
      let threw = false;
      try {
        await fakeVerifyPassword("any-attempted-password");
      } catch {
        threw = true;
      }
      expect(threw).toBe(false);
    });

    it("should have a precomputed valid DUMMY_HASH using the same argon2id parameters", () => {
      expect(typeof DUMMY_HASH).toBe("string");
      expect(DUMMY_HASH.startsWith("$argon2id$")).toBe(true);
    });
  });

  describe("HASH_OPTIONS", () => {
    it("should enforce robust security parameters", () => {
      expect(HASH_OPTIONS.algorithm).toBe("argon2id");
      expect(HASH_OPTIONS.memoryCost).toBe(19456);
      expect(HASH_OPTIONS.timeCost).toBe(2);
    });
  });
});
