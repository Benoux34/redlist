import { AppError } from "@api/lib/errors";
import { describe, expect, it } from "bun:test";

describe("Shared Backend - AppError", () => {
  it("should create AppError with status 409 for conflict errors", () => {
    const emailErr = new AppError("EMAIL_TAKEN");
    expect(emailErr.code).toBe("EMAIL_TAKEN");
    expect(emailErr.status).toBe(409);
    expect(emailErr.name).toBe("AppError");
    expect(emailErr instanceof Error).toBe(true);
    expect(emailErr instanceof AppError).toBe(true);

    const pseudoErr = new AppError("PSEUDO_TAKEN");
    expect(pseudoErr.code).toBe("PSEUDO_TAKEN");
    expect(pseudoErr.status).toBe(409);
  });

  it("should create AppError with status 401 for auth errors", () => {
    const credsErr = new AppError("INVALID_CREDENTIALS");
    expect(credsErr.code).toBe("INVALID_CREDENTIALS");
    expect(credsErr.status).toBe(401);

    const unauthErr = new AppError("UNAUTHENTICATED");
    expect(unauthErr.code).toBe("UNAUTHENTICATED");
    expect(unauthErr.status).toBe(401);
  });

  it("should create AppError with status 404 for not found errors", () => {
    const notFoundErr = new AppError("NOT_FOUND");
    expect(notFoundErr.code).toBe("NOT_FOUND");
    expect(notFoundErr.status).toBe(404);
  });
});
