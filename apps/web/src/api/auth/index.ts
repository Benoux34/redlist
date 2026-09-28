import {
  authResponse,
  type AuthResponse,
  type ForgotPasswordInput,
  type LoginInput,
  type RegisterInput,
  type ResetPasswordInput,
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

function forgotPasswordRequest(input: ForgotPasswordInput): Promise<void> {
  return apiPostEmpty("/api/auth/forgot-password", input);
}

function resetPasswordRequest(input: ResetPasswordInput): Promise<void> {
  return apiPostEmpty("/api/auth/reset-password", input);
}

export {
  registerRequest,
  loginRequest,
  logoutRequest,
  meRequest,
  deleteAccountRequest,
  forgotPasswordRequest,
  resetPasswordRequest,
};
