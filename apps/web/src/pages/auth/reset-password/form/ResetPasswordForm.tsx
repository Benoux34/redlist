import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/useAuth";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiError } from "@/api/client";
import {
  BOX_CLASS,
  ERROR_CLASS,
  ERROR_MESSAGES,
  INVALID_TOKEN_CODE,
  LABEL_CLASS,
  LINK_CLASS,
  resetPasswordFormSchema,
  type ResetPasswordFormValues,
} from "./utils";

const ResetPasswordForm = () => {
  const { resetPassword } = useAuth();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [done, setDone] = useState(false);
  const [errorCode, setErrorCode] = useState<string | null>(null);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: { password: "", passwordConfirm: "" },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    if (token === null) return;

    setErrorCode(null);

    try {
      await resetPassword(token, values.password);
      setDone(true);
    } catch (error) {
      setErrorCode(error instanceof ApiError ? error.code : "UNKNOWN");
    }
  });

  if (token === null || token === "")
    return (
      <div role="alert" className={BOX_CLASS}>
        Ce lien est incomplet. Copiez-le en entier depuis l&apos;email reçu, ou{" "}
        <Link viewTransition to="/forgot-password" className={LINK_CLASS}>
          demandez un nouveau lien
        </Link>
        .
      </div>
    );

  if (done)
    return (
      <div role="status" className={BOX_CLASS}>
        Votre mot de passe a été modifié. Par sécurité, vous avez été déconnecté
        de tous vos appareils.{" "}
        <Link viewTransition to="/login" className={LINK_CLASS}>
          Se connecter
        </Link>
      </div>
    );

  return (
    <form onSubmit={(event) => void onSubmit(event)} noValidate>
      <div className="mb-5">
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <>
              <label htmlFor="reset-password" className={LABEL_CLASS}>
                Nouveau mot de passe
              </label>

              <Input
                {...field}
                id="reset-password"
                type="password"
                placeholder="Au moins 12 caractères"
                autoComplete="new-password"
                aria-invalid={fieldState.invalid}
                aria-describedby={
                  fieldState.error ? "reset-password-error" : undefined
                }
              />

              {fieldState.error && (
                <p id="reset-password-error" className={ERROR_CLASS}>
                  {fieldState.error.message}
                </p>
              )}
            </>
          )}
        />
      </div>

      <div className="mb-6">
        <Controller
          name="passwordConfirm"
          control={form.control}
          render={({ field, fieldState }) => (
            <>
              <label htmlFor="reset-password-confirm" className={LABEL_CLASS}>
                Confirmer le mot de passe
              </label>

              <Input
                {...field}
                id="reset-password-confirm"
                type="password"
                placeholder="Répétez le mot de passe"
                autoComplete="new-password"
                aria-invalid={fieldState.invalid}
                aria-describedby={
                  fieldState.error ? "reset-confirm-error" : undefined
                }
              />

              {fieldState.error && (
                <p id="reset-confirm-error" className={ERROR_CLASS}>
                  {fieldState.error.message}
                </p>
              )}
            </>
          )}
        />
      </div>

      {errorCode !== null && (
        <p role="alert" className="mb-4 text-sm text-[var(--color-status-cr)]">
          {ERROR_MESSAGES[errorCode] ?? "La modification a échoué."}
          {errorCode === INVALID_TOKEN_CODE && (
            <>
              {" "}
              <Link viewTransition to="/forgot-password" className={LINK_CLASS}>
                Demander un nouveau lien
              </Link>
            </>
          )}
        </p>
      )}

      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="mb-6 h-11 w-full text-sm font-medium"
      >
        {form.formState.isSubmitting
          ? "Enregistrement…"
          : "Enregistrer le mot de passe"}
      </Button>
    </form>
  );
};

export { ResetPasswordForm };
