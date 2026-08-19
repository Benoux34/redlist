import type { SpeciesLocation } from "@app/contracts";
import { translateCountry, translateOrigin, translatePresence } from "./utils";
import { SpeciesMap } from "./species-map/SpeciesMap";

type Props = Readonly<{
  locations: SpeciesLocation[];
}>;

const SpeciesLocations = ({ locations }: Props) => {
  if (locations.length === 0) return null;

  return (
    <section className="mb-10">
      <div className="mb-4 flex items-baseline justify-between border-b border-[var(--color-paper-border)] pb-2.5">
        <p className="text-sm font-medium tracking-wide text-[var(--color-ink-muted)]">
          Répartition géographique • Pays & Territoires
        </p>
      </div>

      <SpeciesMap locations={locations} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 divide-y sm:divide-y-0 border-b border-x border-[var(--color-paper-border)] bg-transparent">
        {locations.map((loc, index) => {
          const countryName = translateCountry(loc.countryCode, loc.name);
          const presence = translatePresence(loc.presence);
          const origin = translateOrigin(loc.origin);

          return (
            <div
              key={`${loc.countryCode ?? index}-${loc.name}`}
              className="flex flex-col justify-between  sm:border-r border-[var(--color-paper-border)] p-4 sm:p-5 text-left"
            >
              <div className="mb-3 flex items-baseline justify-between">
                <span className="font-serif text-base font-medium text-[var(--color-ink)]">
                  {countryName}
                </span>
                {loc.countryCode && (
                  <span className="font-mono text-xs text-[var(--color-ink-faint)] uppercase">
                    {loc.countryCode}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                {origin && (
                  <span className="border border-[var(--color-paper-border)] px-2 py-0.5 text-[var(--color-ink-muted)]">
                    {origin}
                  </span>
                )}
                {presence && (
                  <span
                    className={`border px-2 py-0.5 ${
                      loc.presence === "Possibly Extinct" ||
                      loc.presence === "Extinct Post-1500"
                        ? "border-[var(--color-status-cr)]/40 text-[var(--color-status-cr)]"
                        : "border-[var(--color-paper-border)] text-[var(--color-ink-muted)]"
                    }`}
                  >
                    {presence}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export { SpeciesLocations };
