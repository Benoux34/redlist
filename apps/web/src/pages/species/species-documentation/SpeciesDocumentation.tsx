import type { SpeciesSections } from "@app/contracts";
import type { SectionConfig } from "./entities";

type Props = Readonly<{
  sections: SpeciesSections;
}>;

const SpeciesDocumentation = ({ sections }: Props) => {
  const allSections: SectionConfig[] = [
    {
      title: "Aire de répartition & Territoire",
      paragraphs: sections.range,
    },
    {
      title: "Dynamique de population & Déclin",
      paragraphs: sections.population,
    },
    {
      title: "Écologie & Milieu de vie",
      paragraphs: sections.habitats,
    },
    {
      title: "Analyse des menaces",
      paragraphs: sections.threats,
    },
    {
      title: "Actions & Mesures de conservation",
      paragraphs: sections.measures,
    },
    {
      title: "Utilisation & Commerce",
      paragraphs: sections.useTrade,
    },
  ];

  const activeSections = allSections.filter((s) => s.paragraphs.length > 0);

  if (activeSections.length === 0) return null;

  return (
    <section className="mb-10">
      <div className="mb-4 flex items-baseline justify-between border-b border-[var(--color-paper-border)] pb-2.5">
        <p className="text-sm font-medium tracking-wide text-[var(--color-ink-muted)]">
          Documentation scientifique • Évaluation UICN
        </p>
      </div>

      <div className="divide-y divide-[var(--color-paper-border)] border border-[var(--color-paper-border)]">
        {activeSections.map((section) => (
          <article key={section.title} className="p-6 sm:p-8">
            <h2 className="font-serif text-lg sm:text-xl font-medium tracking-tight text-[var(--color-ink)] mb-4">
              {section.title}
            </h2>

            <div className="text-sm leading-relaxed text-[var(--color-ink-muted)]">
              {section.paragraphs.map((paragraph, index) => (
                <p key={index} className="mb-3.5 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export { SpeciesDocumentation };
