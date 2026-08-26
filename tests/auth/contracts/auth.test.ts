import { describe, expect, it } from "bun:test";
import {
  authResponse,
  emailSchema,
  errorResponse,
  loginInput,
  passwordSchema,
  pseudoSchema,
  publicUser,
  registerInput,
  sessionUser,
} from "@app/contracts";

describe("Contracts - Auth Fields", () => {
  describe("emailSchema", () => {
    it("should accept valid emails", () => {
      expect(emailSchema.parse("test@example.com")).toBe("test@example.com");
      expect(emailSchema.parse("user.name+tag@sub.domain.co.uk")).toBe(
        "user.name+tag@sub.domain.co.uk",
      );
    });

    it("should normalize email by trimming and lowercasing", () => {
      expect(emailSchema.parse("  John.Doe@EXAMPLE.COM  ")).toBe(
        "john.doe@example.com",
      );
    });

    it("should reject invalid email formats", () => {
      expect(() => emailSchema.parse("not-an-email")).toThrow();
      expect(() => emailSchema.parse("@missinguser.com")).toThrow();
      expect(() => emailSchema.parse("user@")).toThrow();
      expect(() => emailSchema.parse("")).toThrow();
    });

    it("should reject emails exceeding 254 characters", () => {
      const longEmail = `${"a".repeat(245)}@example.com`;
      expect(() => emailSchema.parse(longEmail)).toThrow();
    });
  });

  describe("passwordSchema", () => {
    it("should accept passwords between 12 and 128 characters", () => {
      const minValid = "a".repeat(12);
      const maxValid = "a".repeat(128);

      expect(passwordSchema.parse(minValid)).toBe(minValid);
      expect(passwordSchema.parse(maxValid)).toBe(maxValid);
      expect(passwordSchema.parse("Correct-Horse-Battery-Staple")).toBe(
        "Correct-Horse-Battery-Staple",
      );
    });

    it("should reject passwords shorter than 12 characters", () => {
      expect(() => passwordSchema.parse("12345678901")).toThrow(
        "12 characters minimum",
      );
      expect(() => passwordSchema.parse("short")).toThrow();
    });

    it("should reject passwords longer than 128 characters", () => {
      const tooLong = "a".repeat(129);
      expect(() => passwordSchema.parse(tooLong)).toThrow(
        "128 characters maximum",
      );
    });
  });

  describe("pseudoSchema", () => {
    it("should accept valid pseudos between 3 and 20 alphanumeric/hyphen/underscore chars", () => {
      expect(pseudoSchema.parse("john_doe")).toBe("john_doe");
      expect(pseudoSchema.parse("User-99")).toBe("User-99");
      expect(pseudoSchema.parse("abc")).toBe("abc");
      expect(pseudoSchema.parse("a".repeat(20))).toBe("a".repeat(20));
    });

    it("should trim surrounding whitespace", () => {
      expect(pseudoSchema.parse("  valid_pseudo  ")).toBe("valid_pseudo");
    });

    it("should reject pseudos shorter than 3 characters", () => {
      expect(() => pseudoSchema.parse("ab")).toThrow("3 characters minimum");
    });

    it("should reject pseudos longer than 20 characters", () => {
      expect(() => pseudoSchema.parse("a".repeat(21))).toThrow(
        "20 characters maximum",
      );
    });

    it("should reject pseudos with forbidden characters", () => {
      expect(() => pseudoSchema.parse("john doe")).toThrow();
      expect(() => pseudoSchema.parse("user@name")).toThrow();
      expect(() => pseudoSchema.parse("pseudo!#")).toThrow();
      expect(() => pseudoSchema.parse("émeric")).toThrow();
    });
  });
});

describe("Contracts - Auth Inputs", () => {
  describe("registerInput", () => {
    it("should parse valid registration input", () => {
      const valid = {
        pseudo: "jean_dupont",
        email: "jean.dupont@example.com",
        password: "SuperSecretPassword123!",
      };

      expect(registerInput.parse(valid)).toEqual({
        pseudo: "jean_dupont",
        email: "jean.dupont@example.com",
        password: "SuperSecretPassword123!",
      });
    });

    it("should reject missing required fields", () => {
      expect(() =>
        registerInput.parse({
          pseudo: "jean_dupont",
          email: "jean@example.com",
        }),
      ).toThrow();
    });

    it("should reject extraneous/unknown properties (strictObject)", () => {
      expect(() =>
        registerInput.parse({
          pseudo: "jean_dupont",
          email: "jean@example.com",
          password: "SuperSecretPassword123!",
          role: "admin",
        }),
      ).toThrow();
    });
  });

  describe("loginInput", () => {
    it("should parse valid login credentials", () => {
      const valid = {
        email: "USER@Example.com",
        password: "any-non-empty-password",
      };

      expect(loginInput.parse(valid)).toEqual({
        email: "user@example.com",
        password: "any-non-empty-password",
      });
    });

    it("should reject empty password", () => {
      expect(() =>
        loginInput.parse({
          email: "user@example.com",
          password: "",
        }),
      ).toThrow("Password required");
    });

    it("should reject invalid email", () => {
      expect(() =>
        loginInput.parse({
          email: "invalid-email",
          password: "password123",
        }),
      ).toThrow();
    });
  });
});

describe("Contracts - Auth Outputs", () => {
  const validUuid = "018f3a9e-8c43-7f2a-b425-4c5e88d12345";
  const validIsoDate = "2026-08-26T10:00:00.000Z";

  it("should validate publicUser schema", () => {
    const user = {
      id: validUuid,
      pseudo: "nature_lover",
      createdAt: validIsoDate,
    };

    expect(publicUser.parse(user)).toEqual(user);
    expect(() => publicUser.parse({ ...user, id: "not-a-uuid" })).toThrow();
    expect(() =>
      publicUser.parse({ ...user, createdAt: "invalid-date" }),
    ).toThrow();
  });

  it("should validate sessionUser schema", () => {
    const user = {
      id: validUuid,
      pseudo: "nature_lover",
      email: "nature@example.com",
      createdAt: validIsoDate,
    };

    expect(sessionUser.parse(user)).toEqual(user);
  });

  it("should validate authResponse", () => {
    const response = {
      user: {
        id: validUuid,
        pseudo: "nature_lover",
        email: "nature@example.com",
        createdAt: validIsoDate,
      },
    };

    expect(authResponse.parse(response)).toEqual(response);
  });

  it("should validate errorResponse", () => {
    expect(errorResponse.parse({ code: "UNAUTHENTICATED" })).toEqual({
      code: "UNAUTHENTICATED",
    });
    expect(() => errorResponse.parse({})).toThrow();
  });
});
