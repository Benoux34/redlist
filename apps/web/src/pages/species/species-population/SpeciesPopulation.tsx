import type { SpeciesPopulation as Population } from "@app/contracts";
import { HomeSectionHeader } from "@/pages/home/_components/home-section-header/HomeSectionHeader";
import { useInView } from "@/hooks/use-in-view/useInView";
import { Reveal } from "@/components/reveal/Reveal";
import { FactTooltip } from "./fact-tooltip/FactTooltip";
import {
  FACT_ICONS,
  GENERATION_TOOLTIP,
  TREND_COLORS,
  TREND_ICONS,
} from "./utils";

type Props = Readonly<{
  population: Population;
}>;

const SpeciesPopulation = ({ population }: Props) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const { trend, facts } = population;

  if (trend === "Unknown" && facts.length === 0) return null;

  const TrendIcon = TREND_ICONS[trend];

  return (
    <section id="population" className="mb-20 scroll-mt-24 text-left">
      <HomeSectionHeader
        eyebrow="La population"
        title="Combien en reste-t-il ?"
        lede="Les derniers chiffres connus de l'UICN, traduits en clair."
      />

      <div
        ref={ref}
        className="grid grid-cols-1 border border-[var(--color-paper-border)] lg:grid-cols-12"
      >
        <Reveal
          inView={inView}
          className="group relative flex flex-col justify-center gap-4 overflow-hidden border-b border-[var(--color-paper-border)] bg-[var(--color-paper-muted)]/30 p-6 sm:p-8 lg:col-span-5 lg:border-b-0 lg:border-r"
        >
          <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-faint)]">
            Tendance
          </p>
          <div className={`flex items-center gap-4 ${TREND_COLORS[trend]}`}>
            <TrendIcon
              className="size-12 shrink-0 transition-transform duration-500 group-hover:scale-110 motion-reduce:transition-none"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <p className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
              {population.trendLabel}
            </p>
          </div>
          <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">
            {population.trendText}
          </p>
        </Reveal>

        {facts.length > 0 && (
          <ul className="divide-y divide-[var(--color-paper-border)] lg:col-span-7">
            {facts.map((fact, index) => {
              const Icon = FACT_ICONS[fact.key];

              return (
                <li key={fact.key} className="group">
                  <Reveal inView={inView} index={index + 1}>
                    <div className="flex gap-4 px-6 py-4 transition-colors duration-300 group-hover:bg-[var(--color-paper-muted)]/60 sm:px-8">
                      <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center border border-[var(--color-paper-border-strong)] bg-[var(--color-paper-card)] text-[var(--color-ink)] transition-colors duration-300 group-hover:border-[var(--color-ink)] group-hover:bg-[var(--color-ink)] group-hover:text-[var(--color-paper)]">
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="mb-0.5 font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-faint)]">
                          {fact.label}
                        </p>
                        <p className="font-serif text-lg leading-snug text-[var(--color-ink)]">
                          {fact.text}
                          {fact.key === "generation" && (
                            <>
                              {" "}
                              <FactTooltip text={GENERATION_TOOLTIP} />
                            </>
                          )}
                        </p>
                        {fact.hint && (
                          <p className="mt-0.5 text-xs leading-relaxed text-[var(--color-ink-muted)]">
                            {fact.hint}
                          </p>
                        )}
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};

export { SpeciesPopulation };
