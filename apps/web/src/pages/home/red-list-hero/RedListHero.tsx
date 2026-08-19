import { useSpeciesOfTheDay } from "@/hooks/useSpeciesOfTheDay";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

const RedListHero = () => {
  const { data: species, status } = useSpeciesOfTheDay();

  return (
    <section className="mt-4 mb-14">
      <h1 className="font-serif text-4xl font-medium tracking-tight text-[var(--color-ink)] md:text-5xl mb-2">
        La Liste Rouge des espèces menacées
      </h1>

      <p className="text-base leading-relaxed text-[var(--color-ink-muted)] sm:text-lg mb-5 max-w-5xl">
        L&apos;inventaire mondial de référence sur le risque d&apos;extinction
        du vivant. Derrière chaque statut scientifique se trouvent des êtres
        vivants réels, animaux, végétaux, champignons, dont la survie ne tient
        plus qu&apos;à un fil.
      </p>

      {status === "success" && species && (
        <div>
          <Link
            to={`/species/${species.assessmentId}`}
            className="group inline-flex items-center gap-3 border border-[var(--color-paper-border)] bg-[var(--color-paper-muted)]/30 px-3.5 py-2 text-xs text-[var(--color-ink-muted)] hover:border-[var(--color-paper-border-strong)] hover:bg-[var(--color-paper-muted)]/60 hover:text-[var(--color-ink)] transition-colors"
          >
            <span className="font-serif text-sm font-medium text-[var(--color-ink)]">
              {species.vernacularNameFr ?? species.scientificName}
            </span>

            <span className="hidden sm:inline font-serif text-xs italic text-[var(--color-ink-muted)]">
              ({species.scientificName})
            </span>

            <span className="text-[11px] font-medium text-[var(--color-ink-muted)]">
              • {species.categoryCode}
            </span>

            <span className="inline-flex items-center gap-1 font-medium text-[var(--color-ink)] pl-1">
              <span className="hidden sm:inline">Découvrir</span>
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      )}
    </section>
  );
};

export { RedListHero };
