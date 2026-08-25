import { rateLimit } from "@/lib";

const LIST_RATE_LIMIT = {
  limit: 60,
  windowMs: 60 * 1000,
  keyPrefix: "red-list",
} as const;

const DETAIL_RATE_LIMIT = {
  limit: 30,
  windowMs: 60 * 1000,
  keyPrefix: "red-list-detail",
} as const;

const listLimiter = rateLimit(LIST_RATE_LIMIT);
const detailLimiter = rateLimit(DETAIL_RATE_LIMIT);

export { listLimiter, detailLimiter, LIST_RATE_LIMIT, DETAIL_RATE_LIMIT };
