import {
  RESET_TOKEN_TTL_MS,
  isResetTokenValid,
  resetPasswordMail,
  resetPasswordUrl,
  resetTokenExpiresAt,
} from "@api/modules/auth/service/reset-token/utils";
import { describe, expect, it } from "bun:test";

describe("Backend Auth - Reset Token Utilities", () => {
  const now = Date.UTC(2026, 8, 28, 12, 0, 0);

  describe("resetTokenExpiresAt", () => {
    it("should expire one hour after the given time", () => {
      expect(RESET_TOKEN_TTL_MS).toBe(60 * 60 * 1000);
      expect(resetTokenExpiresAt(now).getTime()).toBe(now + RESET_TOKEN_TTL_MS);
    });
  });

  describe("isResetTokenValid", () => {
    it("should accept a token that has not expired yet", () => {
      expect(isResetTokenValid(new Date(now + 1), now)).toBe(true);
    });

    it("should reject a token at or past its expiry", () => {
      expect(isResetTokenValid(new Date(now), now)).toBe(false);
      expect(isResetTokenValid(new Date(now - 1), now)).toBe(false);
    });

    it("should reject when no token was issued", () => {
      expect(isResetTokenValid(null, now)).toBe(false);
    });
  });

  describe("resetPasswordUrl", () => {
    it("should point to the reset page with the token as query param", () => {
      expect(resetPasswordUrl("https://redlist.dedyn.io", "abc_DEF-123")).toBe(
        "https://redlist.dedyn.io/reset-password?token=abc_DEF-123",
      );
    });

    it("should ignore any path or trailing slash on the origin", () => {
      expect(resetPasswordUrl("http://127.0.0.1:5173/", "tok")).toBe(
        "http://127.0.0.1:5173/reset-password?token=tok",
      );
    });
  });

  describe("resetPasswordMail", () => {
    it("should address the user and carry the link in both formats", () => {
      const url = "https://redlist.dedyn.io/reset-password?token=tok";
      const mail = resetPasswordMail("lecteur@exemple.fr", url);

      expect(mail.to).toBe("lecteur@exemple.fr");
      expect(mail.subject).toBe("Réinitialisation de votre mot de passe");
      expect(mail.text).toContain(url);
      expect(mail.html).toContain(`href="${url}"`);
    });
  });
});
