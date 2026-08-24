import { registerInput } from "@app/contracts";
import z from "zod";

const ERROR_MESSAGES: Record<string, string> = {
  EMAIL_TAKEN: "Cette adresse électronique est déjà utilisée.",
  PSEUDO_TAKEN: "Ce pseudonyme est déjà pris.",
  RATE_LIMITED: "Trop de tentatives. Réessaie plus tard.",
};

const LABEL_CLASS =
  "mb-2 block text-xs font-medium uppercase tracking-wider text-[var(--color-ink-muted)]";

const ERROR_CLASS = "mt-1.5 text-xs text-[var(--color-status-cr)]";

const registerFormSchema = registerInput
  .extend({
    passwordConfirm: z.string(),
  })
  .refine((values) => values.password === values.passwordConfirm, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["passwordConfirm"],
  });
export type RegisterFormValues = z.infer<typeof registerFormSchema>;

export { ERROR_MESSAGES, ERROR_CLASS, LABEL_CLASS, registerFormSchema };
