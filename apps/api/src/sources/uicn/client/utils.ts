import { env } from "@/lib";

const MIN_DELAY_BETWEEN_REQUESTS_MS = 1_200;
const MAX_RETRIES = 4;
const INITIAL_BACKOFF_MS = 2_000;
const USER_AGENT = `redlist/0.1 (${env.CONTACT_EMAIL})`;

export {
  MIN_DELAY_BETWEEN_REQUESTS_MS,
  MAX_RETRIES,
  INITIAL_BACKOFF_MS,
  USER_AGENT,
};
