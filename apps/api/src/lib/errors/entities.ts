type AppErrorCode =
  | "EMAIL_TAKEN"
  | "PSEUDO_TAKEN"
  | "INVALID_CREDENTIALS"
  | "UNAUTHENTICATED"
  | "NOT_FOUND";

type AppErrorStatus = 400 | 401 | 403 | 404 | 409 | 429;

export type { AppErrorCode, AppErrorStatus };
