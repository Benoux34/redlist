import { errorResponse } from "@app/contracts";
import type { ZodType } from "zod";

const API_URL = import.meta.env.VITE_API_URL;

export class ApiError extends Error {
  readonly code: string;
  readonly status: number;

  constructor(code: string, status: number) {
    super(code);

    this.code = code;
    this.status = status;
    this.name = "ApiError";
  }
}

function jsonBody(body: unknown): Pick<RequestInit, "body"> {
  return body === undefined ? {} : { body: JSON.stringify(body) };
}

async function request(path: string, init?: RequestInit): Promise<Response> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const body: unknown = await response.json().catch(() => null);
    const parsed = errorResponse.safeParse(body);

    throw new ApiError(
      parsed.success ? parsed.data.code : "UNKNOWN_ERROR",
      response.status,
    );
  }

  return response;
}

async function apiRequest<T>(
  path: string,
  schema: ZodType<T>,
  method: "PUT" | "DELETE" | "PATCH",
  body?: unknown,
): Promise<T> {
  const response = await request(path, {
    method,
    ...jsonBody(body),
  });

  return schema.parse(await response.json());
}

async function apiGet<T>(path: string, schema: ZodType<T>): Promise<T> {
  const response = await request(path);

  return schema.parse(await response.json());
}

async function apiPost<T>(
  path: string,
  schema: ZodType<T>,
  body?: unknown,
): Promise<T> {
  const response = await request(path, {
    method: "POST",
    ...jsonBody(body),
  });

  return schema.parse(await response.json());
}

async function apiRequestEmpty(
  path: string,
  method: "PUT" | "DELETE" | "PATCH",
  body?: unknown,
): Promise<void> {
  await request(path, {
    method,
    ...jsonBody(body),
  });
}

async function apiPostEmpty(path: string, body?: unknown): Promise<void> {
  await request(path, {
    method: "POST",
    ...jsonBody(body),
  });
}

export { apiRequest, apiGet, apiPost, apiRequestEmpty, apiPostEmpty };
