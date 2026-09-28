import type { Mail } from "./entities";

const SWEEGO_SEND_URL = "https://api.sweego.io/send";
const MAIL_TIMEOUT_MS = 10_000;
const MAIL_FROM = {
  name: "Liste Rouge",
  email: "no-reply@redlist.dedyn.io",
} as const;

function buildSweegoPayload(mail: Mail) {
  return {
    channel: "email",
    provider: "sweego",
    recipients: [{ email: mail.to }],
    from: MAIL_FROM,
    subject: mail.subject,
    "message-txt": mail.text,
    "message-html": mail.html,
  };
}

export { SWEEGO_SEND_URL, MAIL_TIMEOUT_MS, MAIL_FROM, buildSweegoPayload };
