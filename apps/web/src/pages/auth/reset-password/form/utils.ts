import { resetPasswordInput } from "@app/contracts";
import z from "zod";

const LABEL_CLASS =
  "mb-2 block text-xs font-medium uppercase tracking-wider text-[var(--color-ink-muted)]";

const ERROR_CLASS = "mt-1.5 text-xs text-[var(--color-status-cr)]";

const BOX_CLASS =
  "mb-6 border border-[var(--color-paper-border)] bg-[var(--color-paper-muted)]/40 p-5 text-sm leading-relaxed text-[var(--color-ink-muted)]";

const LINK_CLASS =
  "font-medium text-[var(--color-ink)] underline underline-offset-4 transition-opacity hover:opacity-80";

const INVALID_TOKEN_CODE = "INVALID_RESET_TOKEN";

const ERROR_MESSAGES: Record<string, string> = {
  [INVALID_TOKEN_CODE]: "Ce lien a expiré ou a déjà été utilisé.",
  RATE_LIMITED: "Trop de tentatives. Réessaie dans quelques minutes.",
};

const resetPasswordFormSchema = resetPasswordInput
  .pick({ password: true })
  .extend({
    passwordConfirm: z.string(),
  })
  .refine((values) => values.password === values.passwordConfirm, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["passwordConfirm"],
  });
export type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>;

export {
  BOX_CLASS,
  ERROR_CLASS,
  ERROR_MESSAGES,
  INVALID_TOKEN_CODE,
  LABEL_CLASS,
  LINK_CLASS,
  resetPasswordFormSchema,
};
