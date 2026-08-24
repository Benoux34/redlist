import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/useAuth";
import { useState } from "react";
import { loginInput, type LoginInput } from "@app/contracts";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiError } from "@/api/client";
import { ERROR_MESSAGES, LABEL_CLASS, redirectTarget } from "./utils";
import { useNavigate, useLocation } from "react-router";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginInput),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setFormError(null);

    try {
      await login(values.email, values.password);
      void navigate(redirectTarget(location.state), { replace: true });
    } catch (error) {
      const code = error instanceof ApiError ? error.code : "UNKNOWN";
      setFormError(ERROR_MESSAGES[code] ?? "La connexion a échoué.");
    }
  });

  return (
    <form onSubmit={(event) => void onSubmit(event)} noValidate>
      <div className="mb-5">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <>
              <label htmlFor="login-email" className={`mb-2 ${LABEL_CLASS}`}>
                Adresse électronique
              </label>

              <Input
                {...field}
                id="login-email"
                type="email"
                placeholder="nom@exemple.fr"
                autoComplete="email"
                aria-invalid={fieldState.invalid}
                aria-describedby={
                  fieldState.error ? "login-email-error" : undefined
                }
              />

              {fieldState.error && (
                <p
                  id="login-email-error"
                  className="mt-1.5 text-xs text-[var(--color-status-cr)]"
                >
                  {fieldState.error.message}
                </p>
              )}
            </>
          )}
        />
      </div>

      <div className="mb-6">
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <>
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="login-password" className={LABEL_CLASS}>
                  Mot de passe
                </label>
              </div>

              <Input
                {...field}
                id="login-password"
                type="password"
                placeholder="••••••••••••"
                autoComplete="current-password"
                aria-invalid={fieldState.invalid}
                aria-describedby={
                  fieldState.error ? "login-password-error" : undefined
                }
              />

              {fieldState.error && (
                <p
                  id="login-password-error"
                  className="mt-1.5 text-xs text-[var(--color-status-cr)]"
                >
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
        {form.formState.isSubmitting ? "Connexion…" : "Se connecter"}
      </Button>
    </form>
  );
};

export { LoginForm };
