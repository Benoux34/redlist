import { z } from "zod";
import { loginInput, registerInput } from "./auth.input";
import { authResponse, publicUser, sessionUser } from "./auth.output";

type RegisterInput = z.infer<typeof registerInput>;
type LoginInput = z.infer<typeof loginInput>;
type PublicUser = z.infer<typeof publicUser>;
type SessionUser = z.infer<typeof sessionUser>;
type AuthResponse = z.infer<typeof authResponse>;

export type {
  RegisterInput,
  LoginInput,
  PublicUser,
  SessionUser,
  AuthResponse,
};
