import type { CacheEntry } from "./entities";
import { AGGREGATE_TTL_MS, MAX_KEYS } from "./utils";

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

function cachedBy<T>(
  loader: (key: string) => Promise<T>,
  ttlMs: number = AGGREGATE_TTL_MS,
): (key: string) => Promise<T> {
  const loaders = new Map<string, () => Promise<T>>();

  return (key: string) => {
    let load = loaders.get(key);

    if (load === undefined) {
      if (loaders.size >= MAX_KEYS) loaders.clear();

      load = cached(() => loader(key), ttlMs);
      loaders.set(key, load);
    }

    return load();
  };
}

export { cached, cachedBy, AGGREGATE_TTL_MS };
