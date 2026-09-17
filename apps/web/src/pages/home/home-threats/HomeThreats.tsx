import { HomeSectionNote } from "@/pages/home/_components/home-section-note/HomeSectionNote";
import { IPBES_ASSESSMENT_URL } from "@/pages/home/_components/home-section-note/utils";
import { HomeSectionHeader } from "@/pages/home/_components/home-section-header/HomeSectionHeader";
import { useInView } from "@/hooks/use-in-view/useInView";
import { Reveal } from "@/components/reveal/Reveal";
import { THREATS } from "@/components/threats/utils";
import { CELL_LAYOUT } from "./utils";

const HomeThreats = () => {
  const { ref, inView } = useInView<HTMLOListElement>();

  return (
    <section className="mb-20 text-left">
      <HomeSectionHeader
        eyebrow="Les causes"
        title="Pourquoi les espèces disparaissent"
        lede="Cinq grandes pressions expliquent l'essentiel du déclin du vivant. Elles sont classées ici par ordre d'impact, selon l'IPBES, le groupe international d'experts sur la biodiversité."
      />

      <ol
        ref={ref}
        className="grid grid-cols-1 border border-[var(--color-paper-border)] md:grid-cols-6"
      >
        {THREATS.map((threat, index) => {
          const Icon = threat.icon;
          const impact = THREATS.length - index;

          return (
            <li
              key={threat.key}
              className={`group border-[var(--color-paper-border)] ${CELL_LAYOUT[index] ?? ""}`}
            >
              <Reveal inView={inView} index={index} className="h-full">
                <div className="relative flex h-full flex-col gap-4 overflow-hidden p-6 transition-colors duration-300 group-hover:bg-[var(--color-paper-muted)] sm:p-7">
                  <span
                    className="absolute left-0 top-0 h-0.5 w-0 bg-[var(--color-status-cr)] transition-[width] duration-500 ease-out group-hover:w-full motion-reduce:transition-none"
                    aria-hidden="true"
                  />

                  <span className="inline-flex size-11 items-center justify-center border border-[var(--color-paper-border-strong)] bg-[var(--color-paper-card)] text-[var(--color-ink)] transition-colors duration-300 group-hover:border-[var(--color-ink)] group-hover:bg-[var(--color-ink)] group-hover:text-[var(--color-paper)]">
                    <Icon
                      className="size-5 transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                  </span>

                  <div>
                    <p className="mb-1 font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-faint)]">
                      Cause {threat.number}
                    </p>
                    <h3 className="mb-2 font-serif text-xl font-medium tracking-tight text-[var(--color-ink)]">
                      {threat.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">
                      {threat.description}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center gap-3">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-faint)]">
                      Impact
                    </span>
                    <span
                      className="flex gap-1"
                      role="img"
                      aria-label={`Rang ${index + 1} sur ${THREATS.length}`}
                    >
                      {THREATS.map((_, level) => (
                        <span
                          key={level}
                          className={`h-1.5 w-5 transition-colors duration-300 ${
                            level < impact
                              ? "bg-[var(--color-ink-muted)] group-hover:bg-[var(--color-status-cr)]"
                              : "bg-[var(--color-paper-border)]"
                          }`}
                        />
                      ))}
                    </span>
                  </div>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>

      <HomeSectionNote
        sourceLabel="Rapport mondial de l'IPBES"
        sourceHref={IPBES_ASSESSMENT_URL}
      >
        * Classement issu de l&apos;Évaluation mondiale de la biodiversité et
        des services écosystémiques de l&apos;IPBES (2019).
      </HomeSectionNote>
    </section>
  );
};

export { HomeThreats };
