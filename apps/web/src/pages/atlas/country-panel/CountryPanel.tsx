import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import type { CountryProperties } from "@/lib/world-geojson";
import { useCountrySpecies } from "./hooks/useCountrySpecies";
import { lookup } from "../utils";
import { CATEGORY_ROWS, barWidth, initialsOf, numberFr } from "./utils";
import type { CountryIndex } from "../entities";

type Props = Readonly<{
  index: CountryIndex;
  selected: CountryProperties | null;
  hovered: CountryProperties | null;
}>;

const CountryPanel = ({ index, selected, hovered }: Props) => {
  const country = hovered ?? selected;
  const snapshot = lookup(index, country?.iso_a2);
  const { species, isLoading } = useCountrySpecies(
    snapshot === null ? null : (country?.iso_a2 ?? null),
  );

  if (country === null)
    return (
      <div className="flex h-full flex-col justify-center">
        <p className="font-serif text-xl italic leading-relaxed text-[var(--color-ink-faint)]">
          Faites tourner la Terre.
        </p>
      </div>
    );

  return (
    <div className="flex h-full flex-col gap-6">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-faint)]">
          {country.iso_a2 ?? "—"}
        </p>
        <h2 className="mt-1 font-serif text-2xl font-medium leading-tight tracking-tight text-[var(--color-ink)]">
          {country.name_fr || country.name}
        </h2>
      </div>

      {snapshot === null ? (
        <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">
          Aucune donnée de répartition pour ce territoire.
        </p>
      ) : (
        <>
          <div className="border-y border-[var(--color-paper-border)] py-4">
            <p className="font-serif text-4xl font-medium leading-none tracking-tight text-[var(--color-ink)]">
              {numberFr.format(snapshot.threatened)}
            </p>
            <p className="mt-1.5 text-xs text-[var(--color-ink-muted)]">
              espèces menacées ·{" "}
              <span className="text-[var(--color-ink)]">
                {snapshot.rank}
                <sup>{snapshot.rank === 1 ? "er" : "e"}</sup> rang mondial
              </span>
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            {CATEGORY_ROWS.map((row) => {
              const value = snapshot.counts[row.code];

              return (
                <div key={row.code} className="flex flex-col gap-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-xs text-[var(--color-ink-muted)]">
                      {row.label}
                    </span>
                    <span className="font-mono text-xs tabular-nums text-[var(--color-ink)]">
                      {numberFr.format(value)}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-[var(--color-paper-muted)]">
                    <div
                      className="h-full"
                      style={{
                        width: barWidth(value, snapshot.counts),
                        backgroundColor: row.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-baseline justify-between gap-2 border-t border-[var(--color-paper-border)] pt-4">
            <span className="text-xs text-[var(--color-ink-muted)]">
              Disparues
            </span>
            <span className="font-mono text-xs tabular-nums text-[var(--color-ink)]">
              {numberFr.format(snapshot.counts.EX)} éteintes ·{" "}
              {numberFr.format(snapshot.counts.EW)} en captivité
            </span>
          </div>

          {(isLoading || species.length > 0) && (
            <div className="flex flex-col gap-2.5">
              <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-faint)]">
                Quelques espèces
              </p>
              <div className="grid grid-cols-3 gap-2">
                {isLoading
                  ? [0, 1, 2].map((slot) => (
                      <div
                        key={slot}
                        className="aspect-square w-full animate-pulse border border-[var(--color-paper-border)] bg-[var(--color-paper-muted)]/60"
                      />
                    ))
                  : species.map((item) => (
                      <Link
                        viewTransition
                        key={item.assessmentId}
                        to={`/species/${item.assessmentId}`}
                        className="group flex flex-col gap-1"
                      >
                        <div className="aspect-square w-full overflow-hidden border border-[var(--color-paper-border)] bg-[var(--color-paper-muted)]/50 transition-colors group-hover:border-[var(--color-paper-border-strong)]">
                          {item.photoUrl === null ? (
                            <div className="flex h-full w-full items-center justify-center">
                              <span className="font-serif text-base italic tracking-wider text-[var(--color-ink-faint)]">
                                {initialsOf(item.scientificName)}
                              </span>
                            </div>
                          ) : (
                            <img
                              src={item.photoUrl}
                              alt=""
                              loading="lazy"
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                        <p className="truncate text-[10px] leading-tight text-[var(--color-ink-muted)]">
                          {item.vernacularNameFr || item.scientificName}
                        </p>
                      </Link>
                    ))}
              </div>
            </div>
          )}

          <Link
            viewTransition
            to={`/pays/${(country.iso_a2 ?? "").toLowerCase()}`}
            className="mt-auto inline-flex items-center justify-between gap-2 border border-[var(--color-paper-border)] px-3.5 py-2.5 text-xs text-[var(--color-ink)] transition-colors hover:border-[var(--color-paper-border-strong)] hover:bg-[var(--color-paper-muted)]/40"
          >
            <span>Voir les {numberFr.format(snapshot.threatened)} espèces</span>
            <ArrowRight className="size-3.5 shrink-0" />
          </Link>
        </>
      )}
    </div>
  );
};

export { CountryPanel };
