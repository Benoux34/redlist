import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { translateCountry } from "@/lib/country";
import type { CountryValues, MapFilters } from "../entities";
import { filterQualifier } from "../map-filters/utils";
import { countrySearch, numberFr, topCountries } from "../utils";

const RANKING_SIZE = 10;

type Props = Readonly<{
  values: CountryValues;
  filters: MapFilters;
}>;

const CountryRanking = ({ values, filters }: Props) => {
  const ranking = topCountries(values, RANKING_SIZE);
  const search = countrySearch(filters);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-faint)]">
          Classement · {filterQualifier(filters)}
        </p>
        <h2 className="mt-1.5 font-serif text-2xl font-medium tracking-tight text-[var(--color-ink)] sm:text-3xl">
          Les {RANKING_SIZE} pays qui abritent le plus d&apos;espèces
        </h2>
      </div>

      {ranking.length === 0 ? (
        <p className="text-sm text-[var(--color-ink-muted)]">
          Aucun pays ne correspond à ces filtres.
        </p>
      ) : (
        <ol className="grid grid-cols-1 border-t border-[var(--color-paper-border)] sm:grid-cols-2 sm:gap-x-10">
          {ranking.map((entry, i) => {
            const name = translateCountry(entry.code, entry.code);

            return (
              <li
                key={entry.code}
                className="border-b border-[var(--color-paper-border)]"
              >
                <Link
                  viewTransition
                  to={`/pays/${entry.code.toLowerCase()}${search}`}
                  className="group grid grid-cols-[2rem_minmax(0,1fr)_auto_1rem] items-center gap-x-4 py-3 transition-colors hover:bg-[var(--color-paper-muted)]/40"
                >
                  <span className="font-mono text-xs tabular-nums text-[var(--color-ink-faint)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="truncate font-serif text-base text-[var(--color-ink)] group-hover:underline group-hover:underline-offset-4">
                    {name}
                  </span>
                  <span className="text-right font-mono text-sm tabular-nums text-[var(--color-ink)]">
                    {numberFr.format(entry.value)}
                  </span>
                  <ArrowRight className="size-3.5 text-[var(--color-ink-faint)] transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
};

export { CountryRanking };
