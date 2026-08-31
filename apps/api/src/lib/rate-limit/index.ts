import type { Context, MiddlewareHandler } from "hono";
import { getConnInfo } from "hono/bun";
import type { RateLimitOptions } from "./entities";
import { env } from "../env";
import {
  BUCKETS,
  CLEANUP_INTERVAL_MS,
  REAL_IP_HEADER,
  UNKNOWN_IP,
  resolveClientIp,
} from "./utils";

setInterval(() => {
  const now = Date.now();

  for (const [key, bucket] of BUCKETS) {
    if (bucket.resetAt <= now) BUCKETS.delete(key);
  }
}, CLEANUP_INTERVAL_MS).unref();

function remoteAddressOf(c: Context): string | undefined {
  try {
    return getConnInfo(c).remote.address;
  } catch {
    // Not served by Bun.serve (tests, other adapters): no socket address.
    return undefined;
  }
}

function getClientIp(c: Context): string {
  return resolveClientIp({
    trustProxy: env.TRUST_PROXY,
    realIpHeader: c.req.header(REAL_IP_HEADER),
    remoteAddress: remoteAddressOf(c),
  });
}

function rateLimit(options: RateLimitOptions): MiddlewareHandler {
  return async (c, next) => {
    const key = `${options.keyPrefix}:${getClientIp(c)}`;
    const now = Date.now();
    const bucket = BUCKETS.get(key);

    if (!bucket || bucket.resetAt <= now) {
      BUCKETS.set(key, { count: 1, resetAt: now + options.windowMs });
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

export { rateLimit, UNKNOWN_IP };
