import type { SpeciesThreats as Threats } from "@app/contracts";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { HomeSectionHeader } from "@/pages/home/_components/home-section-header/HomeSectionHeader";
import { HomeSectionNote } from "@/pages/home/_components/home-section-note/HomeSectionNote";
import { useInView } from "@/hooks/use-in-view/useInView";
import { Reveal } from "@/components/reveal/Reveal";
import { THREATS } from "@/components/threats/utils";
import { GESTURES_PATH } from "@/components/gestures/utils";
import { CAUSE_PARAM } from "@/pages/actions/utils";
import { ThreatDetails } from "./threat-details/ThreatDetails";
import {
  OTHER_CAUSE,
  THREAT_CLASSIFICATION_URL,
  VISIBLE_LABELS,
} from "./utils";

type Props = Readonly<{
  threats: Threats;
}>;

const SpeciesThreats = ({ threats }: Props) => {
  const { ref, inView } = useInView<HTMLOListElement>();

  const { groups, items } = threats;

  if (items.length === 0) return null;

  return (
    <section id="menaces" className="mb-20 scroll-mt-24 text-left">
      <HomeSectionHeader
        eyebrow="Les menaces"
        title="Pourquoi est-elle menacée ?"
        lede={`L'UICN a identifié ${items.length} ${items.length > 1 ? "menaces" : "menace"} pour cette espèce. Elles sont regroupées ici selon les grandes causes du déclin du vivant, de la plus grave à la moins grave.`}
      />

      <ol
        ref={ref}
        className="divide-y divide-[var(--color-paper-border)] border border-[var(--color-paper-border)]"
      >
        {groups.map((group, index) => {
          const cause =
            group.cause === "other"
              ? OTHER_CAUSE
              : (THREATS.find((threat) => threat.key === group.cause) ??
                OTHER_CAUSE);
          const Icon = cause.icon;
          const hidden = group.labels.length - VISIBLE_LABELS;

          return (
            <li key={group.cause} className="group">
              <Reveal inView={inView} index={index}>
                <div className="relative grid grid-cols-1 gap-5 overflow-hidden p-6 transition-colors duration-300 group-hover:bg-[var(--color-paper-muted)]/60 sm:p-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_auto] md:items-center md:gap-10">
                  <span
                    className="absolute left-0 top-0 h-0.5 w-0 bg-[var(--color-status-cr)] transition-[width] duration-500 ease-out group-hover:w-full motion-reduce:transition-none"
                    aria-hidden="true"
                  />

                  <div className="flex gap-4">
                    <span className="inline-flex size-11 shrink-0 items-center justify-center border border-[var(--color-paper-border-strong)] bg-[var(--color-paper-card)] text-[var(--color-ink)] transition-colors duration-300 group-hover:border-[var(--color-ink)] group-hover:bg-[var(--color-ink)] group-hover:text-[var(--color-paper)]">
                      <Icon
                        className="size-5 transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                    </span>

                    <div className="min-w-0">
                      <p className="mb-1 font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-faint)]">
                        {index === 0
                          ? "Cause principale"
                          : `Cause ${String(index + 1).padStart(2, "0")}`}
                      </p>
                      <h3 className="mb-2 font-serif text-xl font-medium tracking-tight text-[var(--color-ink)]">
                        {cause.title}
                      </h3>

                      <div className="flex items-center gap-3">
                        <span
                          className="flex gap-1"
                          role="img"
                          aria-label={group.impactLabel}
                        >
                          {[0, 1, 2].map((level) => (
                            <span
                              key={level}
                              className={`h-1.5 w-5 transition-colors duration-300 ${
                                level < group.impactLevel
                                  ? "bg-[var(--color-ink-muted)] group-hover:bg-[var(--color-status-cr)]"
                                  : "bg-[var(--color-paper-border)]"
                              }`}
                            />
                          ))}
                        </span>
                        <span className="text-xs text-[var(--color-ink-muted)]">
                          {group.impactLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-faint)]">
                      Pourquoi
                    </p>
                    <ul className="flex flex-wrap gap-1.5">
                      {group.labels.slice(0, VISIBLE_LABELS).map((label) => (
                        <li
                          key={label}
                          className="border border-[var(--color-paper-border)] bg-[var(--color-paper-card)] px-2.5 py-1 text-xs text-[var(--color-ink)]"
                        >
                          {label}
                        </li>
                      ))}
                      {hidden > 0 && (
                        <li className="px-1 py-1 text-xs text-[var(--color-ink-faint)]">
                          +{hidden} autre{hidden > 1 ? "s" : ""}
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="md:justify-self-end">
                    {group.cause !== "other" && (
                      <Link
                        viewTransition
                        to={`${GESTURES_PATH}?${CAUSE_PARAM}=${group.cause}`}
                        className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-medium text-[var(--color-ink)] underline decoration-[var(--color-paper-border-strong)] underline-offset-4 transition-colors hover:decoration-[var(--color-status-cr)]"
                      >
                        <span>Ce que vous pouvez faire</span>
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>

      <ThreatDetails threats={items} />

      <HomeSectionNote
        sourceLabel="Classification des menaces de l'UICN"
        sourceHref={THREAT_CLASSIFICATION_URL}
      >
        * Regroupement des 12 familles de menaces de l&apos;UICN dans les
        grandes causes identifiées par l&apos;IPBES.
      </HomeSectionNote>
    </section>
  );
};

export { SpeciesThreats };
