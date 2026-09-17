import { Link } from "react-router";
import { Button } from "@/components/ui/button";

type Props = Readonly<{
  onRetry: () => void;
}>;

const SpeciesError = ({ onRetry }: Props) => (
  <section
    className="mx-auto flex max-w-xl flex-1 flex-col items-center justify-center py-12 text-center"
    role="alert"
  >
    <p className="mb-3 font-mono text-xs uppercase tracking-wider text-[var(--color-ink-faint)]">
      Erreur de chargement
    </p>
    <h1 className="mb-4 font-serif text-4xl tracking-tight text-[var(--color-ink)]">
      La fiche n&apos;a pas pu être chargée.
    </h1>
    <p className="mb-8 text-sm leading-relaxed text-[var(--color-ink-muted)]">
      Le serveur n&apos;a pas répondu. Réessayez dans un instant.
    </p>
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button onClick={onRetry}>Réessayer</Button>
      <Button
        variant="outline"
        render={<Link viewTransition to="/threatened-species" />}
      >
        Retour au catalogue
      </Button>
    </div>
  </section>
);

export { SpeciesError };
