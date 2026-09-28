import { category_colors, group_labels } from "@/components/species-grid/utils";
import type { MapFilters } from "../entities";

const THREATENED_CODES = ["VU", "EN", "CR"] as const;

const Status = ({ code }: Readonly<{ code: string }>) => (
  <span className="whitespace-nowrap font-medium text-[var(--color-ink)]">
    {category_colors[code]?.label ?? code}{" "}
    <span className={`font-mono text-xs ${category_colors[code]?.text ?? ""}`}>
      ({code})
    </span>
  </span>
);

const FilterSentence = ({ filters }: Readonly<{ filters: MapFilters }>) => {
  const group =
    filters.group === null
      ? ""
      : `, uniquement parmi les ${group_labels[filters.group].toLowerCase()}`;

  if (filters.status !== "threatened")
    return (
      <>
        Chaque pays est coloré selon le nombre d&apos;espèces présentes sur son
        territoire et classées <Status code={filters.status} />
        {group}.
      </>
    );

  return (
    <>
      Chaque pays est coloré selon le total de ses espèces menacées : toutes les
      espèces présentes sur son territoire et classées{" "}
      {THREATENED_CODES.map((code, i) => (
        <span key={code}>
          <Status code={code} />
          {i < THREATENED_CODES.length - 2
            ? ", "
            : i === THREATENED_CODES.length - 2
              ? " ou "
              : ""}
        </span>
      ))}
      {group}.
    </>
  );
};

export { FilterSentence };
