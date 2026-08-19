import type { Context, MiddlewareHandler } from "hono";
import type { Bucket, RateLimitOptions } from "./entities";

const CLEANUP_INTERVAL_MS = 60_000;

const buckets = new Map<string, Bucket>();

setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}, CLEANUP_INTERVAL_MS).unref();

function getClientIp(c: Context): string {
  const forwarded = c.req.header("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();

  return first ?? "unknown";
}

function rateLimit(options: RateLimitOptions): MiddlewareHandler {
  return async (c, next) => {
    const key = `${options.keyPrefix}:${getClientIp(c)}`;
    const now = Date.now();
    const bucket = buckets.get(key);

    if (!bucket || bucket.resetAt <= now) {
      buckets.set(key, { count: 1, resetAt: now + options.windowMs });
      return next();
    }

    if (bucket.count >= options.limit) {
      const retryAfter = Math.ceil((bucket.resetAt - now) / 1000);
      c.header("Retry-After", String(retryAfter));
      return c.json({ code: "RATE_LIMITED" }, 429);
    }

    bucket.count += 1;
    return next();
  };
}

export { rateLimit };
