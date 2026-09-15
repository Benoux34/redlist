import { useCallback, useMemo, useState } from "react";
import { countryCountsRequest } from "@/api/red-list";
import { useAsyncData } from "@/hooks/use-async-data/useAsyncData";
import type { CountryProperties } from "@/lib/world-geojson";
import { GlobeCanvas } from "./globe-canvas/GlobeCanvas";
import { CountryPanel } from "./country-panel/CountryPanel";
import { GlobeLegend } from "./globe-legend/GlobeLegend";
import { buildCountryIndex } from "./utils";

const Atlas = () => {
  const [hovered, setHovered] = useState<CountryProperties | null>(null);
  const [selected, setSelected] = useState<CountryProperties | null>(null);

  const onHover = useCallback((country: CountryProperties | null) => {
    setHovered(country);
  }, []);

  const onSelect = useCallback((country: CountryProperties | null) => {
    setSelected(country);
  }, []);

  const counts = useAsyncData(countryCountsRequest, []);
  const index = useMemo(
    () => buildCountryIndex(counts.data ?? []),
    [counts.data],
  );

  return (
    <div className="mx-[calc(50%-50vw)] py-8 md:py-0">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px]">
        <div className="relative h-[70vh] min-h-[420px] w-full min-w-0 overflow-hidden lg:h-[80vh]">
          <GlobeCanvas index={index} onHover={onHover} onSelect={onSelect} />
          <GlobeLegend />
        </div>

        <aside className="border-t border-[var(--color-paper-border)] px-5 py-5 lg:border-l lg:border-t-0 lg:py-8">
          <CountryPanel index={index} selected={selected} hovered={hovered} />
        </aside>
      </div>
    </div>
  );
};

export default Atlas;
