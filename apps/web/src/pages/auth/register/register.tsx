import { Link } from "react-router";
import { RegisterForm } from "./form/RegisterForm";

const Register = () => {
  return (
    <div className="w-full max-w-lg border border-[var(--color-paper-border)] bg-[var(--color-paper)] p-8 sm:p-10 shadow-xs">
      <h1 className="mb-2 font-serif text-3xl font-medium tracking-tight text-[var(--color-ink)]">
        Créer un compte
      </h1>

      <p className="mb-8 text-sm leading-relaxed text-[var(--color-ink-muted)]">
        Rejoignez la plateforme pour suivre l&apos;évolution des taxons menacés
        et organiser vos collections.
      </p>

      <RegisterForm />

      <div className="border-t border-[var(--color-paper-border)] pt-5 text-center text-xs text-[var(--color-ink-muted)]">
        <span>Vous avez déjà un compte ? </span>
        <Link
          to="/login"
          className="font-medium text-[var(--color-ink)] underline underline-offset-4 transition-opacity hover:opacity-80"
        >
          Se connecter
        </Link>
      </div>
    </div>
  );
};

export default Register;
