type AppErrorCode =
  | "EMAIL_TAKEN"
  | "PSEUDO_TAKEN"
  | "INVALID_CREDENTIALS"
  | "UNAUTHENTICATED"
  | "NOT_FOUND";

type AppErrorStatus = 400 | 401 | 403 | 404 | 409 | 429;

type Bucket = {
  count: number;
  resetAt: number;
};

type RateLimitOptions = {
  limit: number;
  windowMs: number;
  keyPrefix: string;
};

export type { AppErrorCode, AppErrorStatus, Bucket, RateLimitOptions };
