import type { AppErrorCode, AppErrorStatus } from "./entities";

const STATUS_BY_CODE: Record<AppErrorCode, AppErrorStatus> = {
  EMAIL_TAKEN: 409,
  PSEUDO_TAKEN: 409,
  INVALID_CREDENTIALS: 401,
  UNAUTHENTICATED: 401,
  NOT_FOUND: 404,
};

export class AppError extends Error {
  readonly code: AppErrorCode;
  readonly status: AppErrorStatus;

  constructor(code: AppErrorCode) {
    super(code);

    this.code = code;
    this.status = STATUS_BY_CODE[code];
    this.name = "AppError";
  }
}
