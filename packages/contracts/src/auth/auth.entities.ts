import { z } from "zod";
import {
  forgotPasswordInput,
  loginInput,
  registerInput,
  resetPasswordInput,
} from "./auth.input";
import { authResponse, publicUser, sessionUser } from "./auth.output";

type RegisterInput = z.infer<typeof registerInput>;
type LoginInput = z.infer<typeof loginInput>;
type ForgotPasswordInput = z.infer<typeof forgotPasswordInput>;
type ResetPasswordInput = z.infer<typeof resetPasswordInput>;
type PublicUser = z.infer<typeof publicUser>;
type SessionUser = z.infer<typeof sessionUser>;
type AuthResponse = z.infer<typeof authResponse>;

export type {
  RegisterInput,
  LoginInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  PublicUser,
  SessionUser,
  AuthResponse,
};
