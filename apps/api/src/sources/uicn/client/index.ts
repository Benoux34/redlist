import { env } from "@/lib";
import {
  INITIAL_BACKOFF_MS,
  MAX_RETRIES,
  MIN_DELAY_BETWEEN_REQUESTS_MS,
  USER_AGENT,
} from "./utils";

let lastRequestAt = 0;
let queue: Promise<unknown> = Promise.resolve();

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function throttled<T>(task: () => Promise<T>): Promise<T> {
  const run = async (): Promise<T> => {
    const elapsed = Date.now() - lastRequestAt;
    const wait = MIN_DELAY_BETWEEN_REQUESTS_MS - elapsed;

    if (wait > 0) await sleep(wait);

    lastRequestAt = Date.now();
    return task();
  };

  const result = queue.then(run, run);
  queue = result.then(
    () => undefined,
    () => undefined,
  );

  return result;
}

async function requestOnce(path: string): Promise<Response> {
  return fetch(`${env.IUCN_API_BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${env.IUCN_API_TOKEN}`,
      Accept: "application/json",
      "User-Agent": USER_AGENT,
    },
  });
}

async function iucnRequest(path: string): Promise<unknown> {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    const response = await throttled(() => requestOnce(path));

    if (response.ok) return response.json();

    if (response.status === 401 || response.status === 403)
      throw new Error(
        `IUCN auth failed (${response.status}). Check IUCN_API_TOKEN.`,
      );

    const isRetryable = response.status === 429 || response.status >= 500;

    if (!isRetryable || attempt === MAX_RETRIES)
      throw new Error(`IUCN request failed: ${response.status} on ${path}`);

    const retryAfterHeader = response.headers.get("Retry-After");
    const retryAfterMs = retryAfterHeader
      ? Number(retryAfterHeader) * 1000
      : INITIAL_BACKOFF_MS * 2 ** attempt;

    console.warn(
      `IUCN ${response.status} on ${path}, retrying in ${retryAfterMs}ms`,
    );

    await sleep(retryAfterMs);
  }

  throw new Error(`IUCN request failed after retries: ${path}`);
}

export { iucnRequest };
