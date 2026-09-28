import { env } from "../env";
import type { Mail } from "./entities";
import { MAIL_TIMEOUT_MS, SWEEGO_SEND_URL, buildSweegoPayload } from "./utils";

async function sendMail(mail: Mail): Promise<void> {
  const response = await fetch(SWEEGO_SEND_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Api-Key": env.SWEEGO_API_KEY,
    },
    body: JSON.stringify(buildSweegoPayload(mail)),
    signal: AbortSignal.timeout(MAIL_TIMEOUT_MS),
  });

  if (!response.ok)
    throw new Error(
      `Sweego send failed (${response.status}): ${await response.text()}`,
    );
}

export { sendMail };
