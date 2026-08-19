import {
  authResponse,
  type AuthResponse,
  type LoginInput,
  type RegisterInput,
} from "@app/contracts";
import { apiGet, apiPost, apiPostEmpty } from "@/api/client";

function registerRequest(input: RegisterInput): Promise<AuthResponse> {
  return apiPost("/api/auth/register", authResponse, input);
}

function loginRequest(input: LoginInput): Promise<AuthResponse> {
  return apiPost("/api/auth/login", authResponse, input);
}

function logoutRequest(): Promise<void> {
  return apiPostEmpty("/api/auth/logout");
}

function meRequest(): Promise<AuthResponse> {
  return apiGet("/api/auth/me", authResponse);
}

export { registerRequest, loginRequest, logoutRequest, meRequest };
