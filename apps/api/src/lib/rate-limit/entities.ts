type RateLimitOptions = {
  limit: number;
  windowMs: number;
  keyPrefix: string;
};

type Bucket = {
  count: number;
  resetAt: number;
};

export type { RateLimitOptions, Bucket };
