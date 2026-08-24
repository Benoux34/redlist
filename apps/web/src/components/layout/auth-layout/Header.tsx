import { Link } from "react-router";
import { ChevronLeft } from "lucide-react";

const Header = () => {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between">
      <Link
        to="/"
        className="group flex items-baseline transition-opacity hover:opacity-80"
      >
        <p className="pr-1 pt-1 font-serif text-2xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-3xl">
          REDLIST
        </p>
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-status-cr)] transition-transform group-hover:scale-125" />
      </Link>

      <Link
        to="/"
        className="inline-flex items-center gap-1.5 border border-[var(--color-paper-border)] bg-transparent px-3 py-1.5 text-xs text-[var(--color-ink-muted)] transition-colors hover:border-[var(--color-paper-border-strong)] hover:text-[var(--color-ink)]"
      >
        <ChevronLeft className="size-3.5" />
        <span>Retour à l&apos;accueil</span>
      </Link>
    </header>
  );
};

export { Header };
