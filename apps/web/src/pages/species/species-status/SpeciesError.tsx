import { ChevronLeft } from "lucide-react";
import { Link } from "react-router";

type Props = Readonly<{
  onRetry: () => void;
}>;

const SpeciesError = ({ onRetry }: Props) => {
  return (
    <div className="py-16 text-center border border-[var(--color-paper-border)] p-10" role="alert">
      <h2 className="font-serif text-2xl font-medium text-[var(--color-ink)] mb-2">
        Impossible de charger les données
      </h2>
      <p className="text-sm text-[var(--color-ink-muted)] max-w-md mx-auto mb-6">
        Une erreur est survenue lors de la récupération des détails auprès du serveur.
      </p>
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="border border-[var(--color-paper-border-strong)] bg-[var(--color-paper-muted)]/60 px-4 py-2 text-xs font-medium text-[var(--color-ink)] hover:bg-[var(--color-paper-muted)] transition-colors cursor-pointer"
        >
          Réessayer
        </button>
        <Link
          to="/red-list"
          className="inline-flex items-center gap-1.5 border border-[var(--color-paper-border)] bg-[var(--color-paper)] px-4 py-2 text-xs font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
        >
          <ChevronLeft className="size-3.5" />
          <span>Retour à la liste</span>
        </Link>
      </div>
    </div>
  );
};

export { SpeciesError };
