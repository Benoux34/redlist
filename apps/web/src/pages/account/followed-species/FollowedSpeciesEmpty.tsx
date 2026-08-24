import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

const FollowedSpeciesEmpty = () => {
  return (
    <div className="border border-[var(--color-paper-border)] bg-[var(--color-paper-muted)]/20 p-8 sm:p-12 text-left">
      <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[var(--color-ink)] mb-4">
        Pourquoi suivre des espèces ?
      </h3>

      <div className="max-w-3xl text-sm sm:text-base leading-relaxed text-[var(--color-ink-muted)] space-y-3 mb-8">
        <p>
          La Liste Rouge mondiale est réévaluée plusieurs fois par an par les
          groupes d&apos;experts de l&apos;UICN. L&apos;état des populations
          sauvages n&apos;est pas figé : certaines espèces s&apos;effondrent
          sous la pression des menaces, d&apos;autres se rétablissent grâce aux
          plans de sauvegarde.
        </p>
        <p>
          En suivant des taxons, cet espace vous préviendra automatiquement de
          tout changement de statut ou de réévaluation scientifique entre deux
          versions.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 border border-[var(--color-ink)] bg-[var(--color-ink)] px-4 py-2.5 text-xs font-medium text-[var(--color-paper)] transition-opacity hover:opacity-90"
        >
          <span>Explorer la Liste Rouge</span>
          <ArrowRight className="size-3.5" />
        </Link>

        <Link
          to="/france"
          className="inline-flex items-center gap-2 border border-[var(--color-paper-border)] bg-transparent px-4 py-2.5 text-xs font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-paper-border-strong)] hover:bg-[var(--color-paper-muted)]/50"
        >
          <span>Consulter les espèces en France</span>
        </Link>
      </div>
    </div>
  );
};

export { FollowedSpeciesEmpty };
