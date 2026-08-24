import { Link } from "react-router";
import { LoginForm } from "./form/LoginForm";

const Login = () => {
  return (
    <div className="w-full max-w-lg border border-[var(--color-paper-border)] bg-[var(--color-paper)] p-8 sm:p-10 shadow-xs">
      <h1 className="mb-2 font-serif text-3xl font-medium tracking-tight text-[var(--color-ink)]">
        Accéder à votre compte
      </h1>

      <p className="mb-8 text-sm leading-relaxed text-[var(--color-ink-muted)]">
        Connectez-vous pour retrouver vos espèces sauvegardées, vos notes de
        terrain et vos préférences.
      </p>

      <LoginForm />

      <div className="border-t border-[var(--color-paper-border)] pt-5 text-center text-xs text-[var(--color-ink-muted)]">
        <span>Vous n&apos;avez pas encore de compte ? </span>
        <Link
          to="/register"
          className="font-medium text-[var(--color-ink)] underline underline-offset-4 transition-opacity hover:opacity-80"
        >
          Créer un compte
        </Link>
      </div>
    </div>
  );
};

export default Login;
