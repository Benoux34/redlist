import { Link } from "react-router";
import { ForgotPasswordForm } from "./form/ForgotPasswordForm";
import { usePageMeta } from "@/hooks/use-page-meta/usePageMeta";

const ForgotPassword = () => {
  usePageMeta({
    title: "Mot de passe oublié",
    description: "Recevez un lien pour réinitialiser votre mot de passe.",
    noindex: true,
  });

  return (
    <div className="w-full max-w-lg border border-[var(--color-paper-border)] bg-[var(--color-paper)] p-8 sm:p-10 shadow-xs">
      <h1 className="mb-2 font-serif text-3xl font-medium tracking-tight text-[var(--color-ink)]">
        Mot de passe oublié
      </h1>

      <p className="mb-8 text-sm leading-relaxed text-[var(--color-ink-muted)]">
        Indiquez l&apos;adresse électronique de votre compte. Nous vous
        enverrons un lien pour choisir un nouveau mot de passe.
      </p>

      <ForgotPasswordForm />

      <div className="border-t border-[var(--color-paper-border)] pt-5 text-center text-xs text-[var(--color-ink-muted)]">
        <span>Vous vous en souvenez ? </span>
        <Link
          viewTransition
          to="/login"
          className="font-medium text-[var(--color-ink)] underline underline-offset-4 transition-opacity hover:opacity-80"
        >
          Retour à la connexion
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
