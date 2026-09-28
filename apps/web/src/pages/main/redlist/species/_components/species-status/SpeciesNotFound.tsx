import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const SpeciesNotFound = () => (
  <section className="mx-auto flex max-w-xl flex-1 flex-col items-center justify-center py-12 text-center">
    <p className="mb-3 font-mono text-xs uppercase tracking-wider text-[var(--color-ink-faint)]">
      Fiche introuvable
    </p>
    <h1 className="mb-4 font-serif text-4xl tracking-tight text-[var(--color-ink)]">
      Cette espèce n&apos;existe pas dans la Liste rouge.
    </h1>
    <p className="mb-8 text-sm leading-relaxed text-[var(--color-ink-muted)]">
      Le lien est peut-être incomplet, ou l&apos;évaluation a été retirée par
      l&apos;UICN.
    </p>
    <Button
      variant="outline"
      render={<Link viewTransition to="/threatened-species" />}
    >
      <ArrowLeft className="size-4" />
      <span>Retour au catalogue</span>
    </Button>
  </section>
);

export { SpeciesNotFound };
