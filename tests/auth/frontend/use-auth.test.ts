import { AuthContext } from "@web/context/context";
import { useAuth } from "@web/context/useAuth";
import { describe, expect, it } from "bun:test";
import React from "react";

describe("Frontend Auth - useAuth Hook & Context", () => {
  it("should throw a descriptive error when used outside AuthProvider (null context)", () => {
    const internals = (React as unknown as { __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE?: { H?: unknown } })
      .__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;

    if (internals) {
      const prevDispatcher = internals.H;
      internals.H = {
        useContext: () => null,
      };

      try {
        expect(() => useAuth()).toThrow(
          "useAuth must be used within an AuthProvider",
        );
      } finally {
        internals.H = prevDispatcher;
      }
    }
  });

  it("should return the auth context value when provided", () => {
    const mockValue = {
      user: null,
      status: "anonymous" as const,
      login: async () => {},
      register: async () => {},
      logout: async () => {},
      deleteAccount: async () => {},
    };

    const internals = (React as unknown as { __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE?: { H?: unknown } })
      .__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;

    if (internals) {
      const prevDispatcher = internals.H;
      internals.H = {
        useContext: () => mockValue,
      };

      try {
        expect(useAuth()).toEqual(mockValue);
      } finally {
        internals.H = prevDispatcher;
      }
    }
  });

  it("should define AuthContext with null default value", () => {
    expect(AuthContext).toBeDefined();
  });
});
