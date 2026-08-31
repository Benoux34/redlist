import type { CacheEntry } from "./entities";
import { AGGREGATE_TTL_MS } from "./utils";

/**
 * Wraps a loader in a single-value TTL cache.
 *
 * Concurrent callers share the same in-flight promise, so a cold cache under
 * load issues one query rather than one per request. A rejected load is not
 * retained.
 */
function cached<T>(
  loader: () => Promise<T>,
  ttlMs: number = AGGREGATE_TTL_MS,
): () => Promise<T> {
  let entry: CacheEntry<T> | null = null;
  let inFlight: Promise<T> | null = null;

  return async () => {
    const now = Date.now();

    if (entry !== null && entry.expiresAt > now) return entry.value;

    inFlight ??= loader()
      .then((value) => {
        entry = { value, expiresAt: Date.now() + ttlMs };
        return value;
      })
      .finally(() => {
        inFlight = null;
      });

    return inFlight;
  };
}

export { cached, AGGREGATE_TTL_MS };
