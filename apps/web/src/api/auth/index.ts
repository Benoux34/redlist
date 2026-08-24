import {
  authResponse,
  type AuthResponse,
  type LoginInput,
  type RegisterInput,
} from "@app/contracts";
import { apiGet, apiPost, apiPostEmpty, apiRequestEmpty } from "@/api/client";

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

function deleteAccountRequest(): Promise<void> {
  return apiRequestEmpty("/api/auth/me", "DELETE");
}

export {
  registerRequest,
  loginRequest,
  logoutRequest,
  meRequest,
  deleteAccountRequest,
};
