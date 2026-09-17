import { HomeSectionNote } from "@/pages/home/_components/home-section-note/HomeSectionNote";
import { IUCN_CRITERIA_URL } from "@/pages/home/_components/home-section-note/utils";
import { useState } from "react";
import { ArrowDown } from "lucide-react";
import { collapsibleClass } from "@/lib/utils";
import { useInView } from "@/hooks/use-in-view/useInView";
import { Reveal } from "@/components/reveal/Reveal";
import { HomeSectionHeader } from "@/pages/home/_components/home-section-header/HomeSectionHeader";
import {
  CLASSIFY,
  EVALUATE,
  OBSERVE,
  SIGNAL_STAGGER_MS,
  SIGNALS,
} from "./utils";
import { Step } from "./step/Step";
import { FlowArrow } from "./flow-arrow/FlowArrow";

const HomeHowItWorks = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="mb-20 text-left">
      <HomeSectionHeader
        eyebrow="Comprendre"
        title="Comment une espèce est-elle classée ?"
        lede="Pour chaque espèce, les scientifiques de l'UICN suivent la même démarche, en trois étapes."
      />

      <div
        ref={ref}
        className="grid grid-cols-1 border border-[var(--color-paper-border)] lg:grid-cols-3"
      >
        <div className="group relative order-1 border-b border-[var(--color-paper-border)] lg:border-b-0 lg:border-r">
          <Reveal inView={inView} className="h-full">
            <Step step={OBSERVE} />
          </Reveal>
          <FlowArrow visible={inView} index={1} />
        </div>

        <div className="group relative order-2 border-b border-[var(--color-paper-border)] bg-[var(--color-paper-muted)] lg:border-b-0 lg:border-r">
          <Reveal inView={inView} index={1} className="h-full">
            <Step step={EVALUATE} highlighted>
              <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                aria-expanded={isOpen}
                aria-controls="home-warning-signals"
                className="mt-auto inline-flex cursor-pointer items-center gap-2 self-start border border-[var(--color-ink)] px-3 py-1.5 text-xs font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
              >
                <span>
                  {isOpen
                    ? "Masquer les signaux d'alerte"
                    : "Voir les 5 signaux d'alerte"}
                </span>
                <ArrowDown
                  className={`size-3.5 transition-transform duration-200 motion-reduce:transition-none ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </Step>
          </Reveal>
          <FlowArrow visible={inView} index={2} />
        </div>

        <div
          id="home-warning-signals"
          inert={!isOpen}
          className={`order-3 lg:order-4 lg:col-span-3 ${collapsibleClass(isOpen)}`}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="relative border-b border-[var(--color-paper-border)] bg-[var(--color-paper-muted)] px-6 pb-7 pt-8 sm:px-7 lg:border-b-0 lg:border-t">
              <span
                className="absolute left-1/2 top-0 z-10 size-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-[var(--color-paper-border)] bg-[var(--color-paper-muted)]"
                aria-hidden="true"
              />

              <div className="mb-6 max-w-2xl">
                <p className="mb-1 font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-faint)]">
                  Étape 02 en détail
                </p>
                <h3 className="mb-2 font-serif text-xl font-medium tracking-tight text-[var(--color-ink)]">
                  Les 5 signaux d&apos;alerte
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">
                  L&apos;UICN les appelle des « critères », notés de A à E. Une
                  espèce n&apos;a pas besoin de tous les cocher : un seul signal
                  suffit, et c&apos;est son intensité qui fixe la gravité du
                  statut.
                </p>
              </div>

              <dl className="grid grid-cols-1 gap-5 lg:grid-cols-5">
                {SIGNALS.map((signal, index) => {
                  return (
                    <div
                      key={signal.letter}
                      style={{
                        transitionDelay: isOpen
                          ? `${(index + 1) * SIGNAL_STAGGER_MS}ms`
                          : "0ms",
                      }}
                      className={`flex gap-3.5 border-l-2 border-[var(--color-paper-border-strong)] pl-3.5 transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none lg:flex-col lg:gap-3 ${
                        isOpen
                          ? "translate-y-0 opacity-100"
                          : "translate-y-3 opacity-0 motion-reduce:translate-y-0"
                      }`}
                    >
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-ink-faint)] mb-1">
                          Critère {signal.letter}
                        </p>
                        <dt className="font-serif text-base font-medium leading-snug text-[var(--color-ink)]">
                          {signal.title}
                        </dt>
                        <dd className="mt-1 text-xs leading-relaxed text-[var(--color-ink-muted)]">
                          {signal.description}
                        </dd>
                      </div>
                    </div>
                  );
                })}
              </dl>
            </div>
          </div>
        </div>

        <div className="group relative order-4 lg:order-3">
          <Reveal inView={inView} index={2} className="h-full">
            <Step step={CLASSIFY} />
          </Reveal>
        </div>
      </div>

      <HomeSectionNote
        sourceLabel="Catégories et critères de l'UICN"
        sourceHref={IUCN_CRITERIA_URL}
      >
        * Présentation simplifiée de la méthode officielle de l&apos;UICN
        (version 3.1). Chaque critère fixe des seuils chiffrés propres à chaque
        statut.
      </HomeSectionNote>
    </section>
  );
};

export { HomeHowItWorks };
