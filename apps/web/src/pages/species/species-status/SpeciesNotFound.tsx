import { ChevronLeft } from "lucide-react";
import { Link } from "react-router";

const SpeciesNotFound = () => {
  return (
    <div className="py-16 text-center border border-[var(--color-paper-border)] p-10">
      <h2 className="font-serif text-2xl font-medium text-[var(--color-ink)] mb-2">
        Spécimen introuvable
      </h2>
      <p className="text-sm text-[var(--color-ink-muted)] mb-6 max-w-md mx-auto">
        L&apos;identifiant fourni ne correspond à aucun enregistrement de la Liste Rouge.
      </p>
      <Link
        to="/red-list"
        className="inline-flex items-center gap-1.5 border border-[var(--color-paper-border-strong)] bg-[var(--color-paper)] px-4 py-2 text-xs font-medium text-[var(--color-ink)] hover:bg-[var(--color-paper-muted)] transition-colors"
      >
        <ChevronLeft className="size-3.5" />
        <span>Retour à la Liste Rouge</span>
      </Link>
    </div>
  );
};

export { SpeciesNotFound };
