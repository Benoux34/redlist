import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/useAuth";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import {
  ERROR_CLASS,
  ERROR_MESSAGES,
  LABEL_CLASS,
  registerFormSchema,
  type RegisterFormValues,
} from "./utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiError } from "@/api/client";

const RegisterForm = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      pseudo: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setFormError(null);

    try {
      await register(values.pseudo, values.email, values.password);
      void navigate("/account", { replace: true });
    } catch (error) {
      const code = error instanceof ApiError ? error.code : "UNKNOWN";
      setFormError(ERROR_MESSAGES[code] ?? "La création du compte a échoué.");
    }
  });
  return (
    <form onSubmit={(event) => void onSubmit(event)} noValidate>
      <div className="mb-5">
        <Controller
          name="pseudo"
          control={form.control}
          render={({ field, fieldState }) => (
            <>
              <label htmlFor="register-pseudo" className={LABEL_CLASS}>
                Pseudonyme
              </label>

              <Input
                {...field}
                id="register-pseudo"
                type="text"
                placeholder="alexandre-d"
                autoComplete="username"
                aria-invalid={fieldState.invalid}
                aria-describedby={
                  fieldState.error ? "register-pseudo-error" : undefined
                }
              />

              {fieldState.error && (
                <p id="register-pseudo-error" className={ERROR_CLASS}>
                  {fieldState.error.message}
                </p>
              )}
            </>
          )}
        />
      </div>

      <div className="mb-5">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <>
              <label htmlFor="register-email" className={LABEL_CLASS}>
                Adresse électronique
              </label>

              <Input
                {...field}
                id="register-email"
                type="email"
                placeholder="nom@exemple.fr"
                autoComplete="email"
                aria-invalid={fieldState.invalid}
                aria-describedby={
                  fieldState.error ? "register-email-error" : undefined
                }
              />

              {fieldState.error && (
                <p id="register-email-error" className={ERROR_CLASS}>
                  {fieldState.error.message}
                </p>
              )}
            </>
          )}
        />
      </div>

      <div className="mb-5">
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <>
              <label htmlFor="register-password" className={LABEL_CLASS}>
                Mot de passe
              </label>

              <Input
                {...field}
                id="register-password"
                type="password"
                placeholder="Au moins 12 caractères"
                autoComplete="new-password"
                aria-invalid={fieldState.invalid}
                aria-describedby={
                  fieldState.error ? "register-password-error" : undefined
                }
              />

              {fieldState.error && (
                <p id="register-password-error" className={ERROR_CLASS}>
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
              <label
                htmlFor="register-password-confirm"
                className={LABEL_CLASS}
              >
                Confirmer le mot de passe
              </label>

              <Input
                {...field}
                id="register-password-confirm"
                type="password"
                placeholder="Répétez le mot de passe"
                autoComplete="new-password"
                aria-invalid={fieldState.invalid}
                aria-describedby={
                  fieldState.error ? "register-confirm-error" : undefined
                }
              />

              {fieldState.error && (
                <p id="register-confirm-error" className={ERROR_CLASS}>
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
        {form.formState.isSubmitting ? "Création…" : "Créer mon compte"}
      </Button>
    </form>
  );
};

export { RegisterForm };
