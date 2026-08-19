import type { SpeciesTaxonomy as TaxonomyType } from "@app/contracts";

type Props = Readonly<{
  taxonomy: TaxonomyType;
  scientificName: string;
}>;

const SpeciesTaxonomy = ({ taxonomy, scientificName }: Props) => {
  const ranks = [
    { label: "Règne", value: taxonomy.kingdom },
    { label: "Embranchement", value: taxonomy.phylum },
    { label: "Classe", value: taxonomy.className },
    { label: "Ordre", value: taxonomy.order },
    { label: "Famille", value: taxonomy.family },
    { label: "Espèce", value: scientificName, isItalic: true },
  ];

  return (
    <section className="mb-10">
      <div className="mb-4 flex items-baseline justify-between border-b border-[var(--color-paper-border)] pb-2.5">
        <p className="text-sm font-medium tracking-wide text-[var(--color-ink-muted)]">
          Classification biologique • Taxonomie
        </p>
      </div>

      <div className="grid grid-cols-2 divide-y divide-[var(--color-paper-border)] border border-[var(--color-paper-border)] sm:grid-cols-3 md:grid-cols-6 md:divide-y-0 md:divide-x">
        {ranks.map((rank) => (
          <div
            key={rank.label}
            className="flex flex-col justify-between p-4 sm:p-5 text-left"
          >
            <span className="text-[11px] uppercase tracking-wider text-[var(--color-ink-faint)] mb-1.5">
              {rank.label}
            </span>
            <span
              className={`text-sm sm:text-base font-medium text-[var(--color-ink)] ${
                rank.isItalic ? "font-serif italic" : "font-serif"
              }`}
            >
              {rank.value ?? "—"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export { SpeciesTaxonomy };
