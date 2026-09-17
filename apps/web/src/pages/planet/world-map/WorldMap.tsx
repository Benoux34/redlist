import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Link } from "react-router";
import { loadWorldGeoJson, type WorldGeoJson } from "@/lib/world-geojson";
import { translateCountry } from "@/lib/country";
import type { CountryValues, MapCountry, ScaleStep } from "../entities";
import { scaleColor } from "../utils";
import { ISLAND_POINTS, OUTLINE_PATH, buildCountryPaths } from "./utils";
import { useMapZoom } from "./hooks/useMapZoom";
import { ZoomControls } from "./zoom-controls/ZoomControls";

type Props = Readonly<{
  values: CountryValues;
  scale: readonly ScaleStep[];
  search: string;
  onHover: (country: MapCountry | null) => void;
}>;

const SHAPE_CLASS =
  "cursor-pointer fill-[var(--fill)] stroke-[var(--color-paper-border-strong)] outline-none transition-colors hover:fill-[var(--color-ink)] focus-visible:fill-[var(--color-ink)]";

const WorldMap = ({ values, scale, search, onHover }: Props) => {
  const [world, setWorld] = useState<WorldGeoJson | null>(null);
  const map = useMapZoom();

  useEffect(() => {
    let cancelled = false;

    loadWorldGeoJson()
      .then((data) => {
        if (!cancelled) setWorld(data);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  const countries = useMemo(
    () => (world === null ? [] : buildCountryPaths(world)),
    [world],
  );

  const islands = ISLAND_POINTS.filter((island) => values.has(island.code));

  const shape = (code: string, name: string) => {
    const country = { code, name: translateCountry(code, name) };

    return {
      label: country.name,
      to: `/pays/${code.toLowerCase()}${search}`,
      handlers: {
        style: {
          "--fill": scaleColor(scale, values.get(code)),
        } as CSSProperties,
        className: SHAPE_CLASS,
        onMouseEnter: () => onHover(country),
        onMouseLeave: () => onHover(null),
        onFocus: () => onHover(country),
        onBlur: () => onHover(null),
      },
    };
  };

  return (
    <div className="relative">
      <svg
        viewBox={map.viewBox}
        aria-label="Planisphère des espèces par pays"
        className={`block h-auto w-full select-none ${map.zoom > 1 ? "cursor-grab touch-none active:cursor-grabbing" : ""}`}
        {...map.panHandlers}
      >
        <path
          d={OUTLINE_PATH}
          className="fill-[var(--color-paper-muted)] stroke-[var(--color-paper-border)]"
          strokeWidth={0.4}
          vectorEffect="non-scaling-stroke"
        />

        {countries.map((country) => {
          const { label, to, handlers } = shape(country.code, country.name);
          const path = (
            <path
              d={country.d}
              strokeWidth={0.5}
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              {...handlers}
            />
          );

          return values.has(country.code) ? (
            <Link
              key={`${country.code}-${country.name}`}
              to={to}
              aria-label={label}
            >
              {path}
            </Link>
          ) : (
            <g key={`${country.code}-${country.name}`}>{path}</g>
          );
        })}

        {islands.map((island) => {
          const { label, to, handlers } = shape(island.code, island.code);

          return (
            <Link key={island.code} to={to} aria-label={label}>
              <circle
                cx={island.x}
                cy={island.y}
                r={2.2 / Math.sqrt(map.zoom)}
                strokeWidth={0.75}
                vectorEffect="non-scaling-stroke"
                {...handlers}
              />
            </Link>
          );
        })}
      </svg>
      <ZoomControls
        canZoomIn={map.canZoomIn}
        canZoomOut={map.canZoomOut}
        onZoomIn={map.zoomIn}
        onZoomOut={map.zoomOut}
        onReset={map.reset}
      />
    </div>
  );
};

export { WorldMap };
