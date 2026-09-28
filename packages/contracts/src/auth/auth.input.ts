import { emailSchema, passwordSchema, pseudoSchema } from "./auth.fields";
import { z } from "zod";

const registerInput = z.strictObject({
  pseudo: pseudoSchema,
  email: emailSchema,
  password: passwordSchema,
});

const loginInput = z.strictObject({
  email: emailSchema,
  password: z.string().min(1, "Password required").max(128),
});

const forgotPasswordInput = z.strictObject({
  email: emailSchema,
});

const resetPasswordInput = z.strictObject({
  token: z.string().min(1).max(128),
  password: passwordSchema,
});

export { registerInput, loginInput, forgotPasswordInput, resetPasswordInput };
