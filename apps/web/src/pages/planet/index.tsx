import { useCallback, useMemo, useState } from "react";
import { countryCountsRequest } from "@/api/red-list";
import { useAsyncData } from "@/hooks/use-async-data/useAsyncData";
import { WorldMap } from "./world-map/WorldMap";
import { CountryTooltip } from "./country-tooltip/CountryTooltip";
import { MapLegend } from "./map-legend/MapLegend";
import { MapFilters } from "./map-filters/MapFilters";
import type { MapCountry, MapFilters as Filters } from "./entities";
import { buildCountryValues, buildScale, countrySearch } from "./utils";

const Planet = () => {
  const [hovered, setHovered] = useState<MapCountry | null>(null);
  const [filters, setFilters] = useState<Filters>({
    status: "threatened",
    group: null,
  });

  const loadCounts = useCallback(
    () => countryCountsRequest(filters.group),
    [filters.group],
  );
  const counts = useAsyncData(loadCounts, [filters.group], {
    keepPreviousData: true,
  });

  const values = useMemo(
    () => buildCountryValues(counts.data ?? [], filters.status),
    [counts.data, filters.status],
  );
  const scale = useMemo(() => buildScale(values.values()), [values]);

  return (
    <div className="py-8 md:py-12">
      <section className="mt-8 mb-10 text-left">
        <h1 className="mb-6 font-serif text-4xl leading-[1.08] tracking-tight text-[var(--color-ink)] sm:text-6xl lg:text-7xl">
          Le vivant menacé, partout sur{" "}
          <span className="italic font-normal underline decoration-[var(--color-paper-border-strong)] decoration-2 underline-offset-8">
            notre planète
          </span>
          .
        </h1>

        <p className="max-w-5xl text-base leading-relaxed text-[var(--color-ink-muted)] sm:text-xl">
          Des forêts de Madagascar aux rivières du Sud-Ouest de la France,
          chaque territoire abrite des espèces dont la survie est en jeu.
          Parcourez la carte pour découvrir où elles vivent.
        </p>
      </section>

      <section className="mb-20 flex flex-col gap-6">
        <MapFilters
          filters={filters}
          onStatusChange={(status) => setFilters({ ...filters, status })}
          onGroupChange={(group) => setFilters({ ...filters, group })}
        />
        <MapLegend filters={filters} scale={scale} />
        <div className="relative">
          <WorldMap
            values={values}
            scale={scale}
            search={countrySearch(filters)}
            onHover={setHovered}
          />
          <CountryTooltip values={values} filters={filters} country={hovered} />
        </div>
      </section>
    </div>
  );
};

export default Planet;
