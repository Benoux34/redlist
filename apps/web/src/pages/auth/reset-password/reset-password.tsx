import { Link } from "react-router";
import { ResetPasswordForm } from "./form/ResetPasswordForm";
import { usePageMeta } from "@/hooks/use-page-meta/usePageMeta";

const ResetPassword = () => {
  usePageMeta({
    title: "Nouveau mot de passe",
    description: "Choisissez un nouveau mot de passe pour votre compte.",
    noindex: true,
  });

  return (
    <div className="w-full max-w-lg border border-[var(--color-paper-border)] bg-[var(--color-paper)] p-8 sm:p-10 shadow-xs">
      <h1 className="mb-2 font-serif text-3xl font-medium tracking-tight text-[var(--color-ink)]">
        Nouveau mot de passe
      </h1>

      <p className="mb-8 text-sm leading-relaxed text-[var(--color-ink-muted)]">
        Choisissez un nouveau mot de passe d&apos;au moins 12 caractères. Il
        remplacera l&apos;ancien sur tous vos appareils.
      </p>

      <ResetPasswordForm />

      <div className="border-t border-[var(--color-paper-border)] pt-5 text-center text-xs text-[var(--color-ink-muted)]">
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

export default ResetPassword;
