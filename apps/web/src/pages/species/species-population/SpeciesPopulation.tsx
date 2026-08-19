import type { SpeciesPopulation } from "@app/contracts";
import { getTrendLabel } from "../species-hero/utils";

type Props = Readonly<{
  population: SpeciesPopulation;
}>;

const SpeciesPopulationSection = ({ population }: Props) => {
  const hasAnyData =
    population.trend !== null ||
    population.size !== null ||
    population.subpopulationCount !== null ||
    population.largestSubpopulation !== null ||
    population.severelyFragmented !== null ||
    population.generationalLength !== null;

  if (!hasAnyData) return null;

  return (
    <section className="mb-10">
      <div className="mb-4 flex items-baseline justify-between border-b border-[var(--color-paper-border)] pb-2.5">
        <p className="text-sm font-medium tracking-wide text-[var(--color-ink-muted)]">
          Dynamique de population • Données démographiques
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 divide-y sm:divide-y-0 border border-[var(--color-paper-border)] bg-transparent">
        {population.generationalLength !== null && (
          <div className="flex flex-col justify-between border-b sm:border-r border-[var(--color-paper-border)] p-5 text-left bg-[var(--color-paper-muted)]/20">
            <span className="text-xs uppercase tracking-wider text-[var(--color-ink-faint)] mb-1.5">
              Durée d&apos;une génération
            </span>
            <p className="font-serif text-xl sm:text-2xl font-medium text-[var(--color-ink)]">
              {population.generationalLength}{" "}
              <span className="text-sm font-sans font-normal text-[var(--color-ink-muted)]">
                ans
              </span>
            </p>
          </div>
        )}

        {population.trend !== null && (
          <div className="flex flex-col justify-between border-b sm:border-r border-[var(--color-paper-border)] p-5 text-left">
            <span className="text-xs uppercase tracking-wider text-[var(--color-ink-faint)] mb-1.5">
              Tendance globale
            </span>
            <p className="font-serif text-lg font-medium text-[var(--color-ink)]">
              {getTrendLabel(population.trend)}
            </p>
          </div>
        )}

        {population.size !== null && (
          <div className="flex flex-col justify-between border-b sm:border-r border-[var(--color-paper-border)] p-5 text-left">
            <span className="text-xs uppercase tracking-wider text-[var(--color-ink-faint)] mb-1.5">
              Individus matures estimés
            </span>
            <p className="font-serif text-lg font-medium text-[var(--color-ink)]">
              {population.size}
            </p>
          </div>
        )}

        {population.subpopulationCount !== null && (
          <div className="flex flex-col justify-between border-b sm:border-r border-[var(--color-paper-border)] p-5 text-left">
            <span className="text-xs uppercase tracking-wider text-[var(--color-ink-faint)] mb-1.5">
              Sous-populations distinctes
            </span>
            <p className="font-serif text-lg font-medium text-[var(--color-ink)]">
              {population.subpopulationCount}
            </p>
          </div>
        )}

        {population.largestSubpopulation !== null && (
          <div className="flex flex-col justify-between border-b sm:border-r border-[var(--color-paper-border)] p-5 text-left">
            <span className="text-xs uppercase tracking-wider text-[var(--color-ink-faint)] mb-1.5">
              Plus grande sous-population
            </span>
            <p className="font-serif text-lg font-medium text-[var(--color-ink)]">
              {population.largestSubpopulation}{" "}
              <span className="text-xs font-sans font-normal text-[var(--color-ink-muted)]">
                individus
              </span>
            </p>
          </div>
        )}

        {population.severelyFragmented !== null && (
          <div className="flex flex-col justify-between border-b sm:border-r border-[var(--color-paper-border)] p-5 text-left">
            <span className="text-xs uppercase tracking-wider text-[var(--color-ink-faint)] mb-1.5">
              Fragmentation de l&apos;habitat
            </span>
            <p className="font-serif text-base font-medium text-[var(--color-ink)]">
              {population.severelyFragmented
                ? "Population sévèrement fragmentée"
                : "Non sévèrement fragmentée"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export { SpeciesPopulationSection };
