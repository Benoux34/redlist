import type { CountryValues, MapCountry, MapFilters } from "../entities";
import { numberFr } from "../utils";
import { filterQualifier } from "../map-filters/utils";

type Props = Readonly<{
  values: CountryValues;
  filters: MapFilters;
  country: MapCountry | null;
}>;

const CountryTooltip = ({ values, filters, country }: Props) => {
  if (country === null) return null;

  const value = values.get(country.code);
  const qualifier = filterQualifier(filters);

  return (
    <div className="pointer-events-none absolute left-0 top-0 border border-[var(--color-paper-border)] bg-[var(--color-paper)]/95 px-3.5 py-2.5 backdrop-blur-sm">
      <p className="font-serif text-lg font-medium leading-tight text-[var(--color-ink)]">
        {country.name}
      </p>
      <p className="mt-0.5 text-xs text-[var(--color-ink-muted)]">
        {value === undefined ? (
          "Aucune donnée"
        ) : (
          <>
            <span className="font-mono tabular-nums text-[var(--color-ink)]">
              {numberFr.format(value)}
            </span>{" "}
            {value > 1 ? "espèces" : "espèce"}
            <span className="text-[var(--color-ink-faint)]">
              {" "}
              · {qualifier}
            </span>
          </>
        )}
      </p>
    </div>
  );
};

export { CountryTooltip };
