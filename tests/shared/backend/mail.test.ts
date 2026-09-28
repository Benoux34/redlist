import { MAIL_FROM, buildSweegoPayload } from "@api/lib/mail/utils";
import { describe, expect, it } from "bun:test";

describe("Backend Shared - Mail", () => {
  describe("buildSweegoPayload", () => {
    it("should map a mail to the Sweego send format", () => {
      const payload = buildSweegoPayload({
        to: "lecteur@exemple.fr",
        subject: "Sujet",
        text: "Texte brut",
        html: "<p>Texte HTML</p>",
      });

      expect(payload).toEqual({
        channel: "email",
        provider: "sweego",
        recipients: [{ email: "lecteur@exemple.fr" }],
        from: MAIL_FROM,
        subject: "Sujet",
        "message-txt": "Texte brut",
        "message-html": "<p>Texte HTML</p>",
      });
    });

    it("should send from the verified domain", () => {
      expect(MAIL_FROM.email.endsWith("@redlist.dedyn.io")).toBe(true);
    });
  });
});
