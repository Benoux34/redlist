import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { forgotPasswordInput, type ForgotPasswordInput } from "@app/contracts";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiError } from "@/api/client";
import { forgotPasswordRequest } from "@/api/auth";
import { ERROR_CLASS, ERROR_MESSAGES, LABEL_CLASS } from "./utils";

const ForgotPasswordForm = () => {
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordInput),
    defaultValues: { email: "" },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setFormError(null);

    try {
      await forgotPasswordRequest(values);
      setSentTo(values.email);
    } catch (error) {
      const code = error instanceof ApiError ? error.code : "UNKNOWN";
      setFormError(ERROR_MESSAGES[code] ?? "L'envoi de la demande a échoué.");
    }
  });

  if (sentTo !== null)
    return (
      <div
        role="status"
        className="mb-6 border border-[var(--color-paper-border)] bg-[var(--color-paper-muted)]/40 p-5 text-sm leading-relaxed text-[var(--color-ink-muted)]"
      >
        Si un compte est associé à{" "}
        <span className="font-medium text-[var(--color-ink)]">{sentTo}</span>,
        vous recevrez un lien pour choisir un nouveau mot de passe. Pensez à
        vérifier vos courriers indésirables.
      </div>
    );

  return (
    <form onSubmit={(event) => void onSubmit(event)} noValidate>
      <div className="mb-6">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <>
              <label htmlFor="forgot-password-email" className={LABEL_CLASS}>
                Adresse électronique
              </label>

              <Input
                {...field}
                id="forgot-password-email"
                type="email"
                placeholder="nom@exemple.fr"
                autoComplete="email"
                aria-invalid={fieldState.invalid}
                aria-describedby={
                  fieldState.error ? "forgot-password-email-error" : undefined
                }
              />

              {fieldState.error && (
                <p id="forgot-password-email-error" className={ERROR_CLASS}>
                  {fieldState.error.message}
                </p>
              )}
            </>
          )}
        />
      </div>

      {formError !== null && (
        <p role="alert" className="mb-4 text-sm text-[var(--color-status-cr)]">
          {formError}
        </p>
      )}

      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="mb-6 h-11 w-full text-sm font-medium"
      >
        {form.formState.isSubmitting ? "Envoi…" : "Envoyer le lien"}
      </Button>
    </form>
  );
};

export { ForgotPasswordForm };
