import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Link } from "react-router";
import { loadWorldGeoJson, type WorldGeoJson } from "@/lib/world-geojson";
import { translateCountry } from "@/lib/country";
import type { MapCountry } from "./entities";
import { ISLAND_POINTS, OUTLINE_PATH, buildCountryPaths } from "./utils";
import { useMapZoom } from "./hooks/useMapZoom";
import { ZoomControls } from "./zoom-controls/ZoomControls";

type Props = Readonly<{
  label: string;
  fills: ReadonlyMap<string, string>;
  hrefOf: (code: string) => string;
  onHover?: (country: MapCountry | null) => void;
}>;

const EMPTY_FILL = "var(--color-paper-card)";

const SHAPE_CLASS =
  "cursor-pointer fill-[var(--fill)] stroke-[var(--color-paper-border-strong)] outline-none transition-colors hover:fill-[var(--color-ink)] focus-visible:fill-[var(--color-ink)]";

const WorldMap = ({ label, fills, hrefOf, onHover }: Props) => {
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

  const islands = ISLAND_POINTS.filter((island) => fills.has(island.code));

  const shape = (code: string, name: string) => {
    const country = { code, name: translateCountry(code, name) };

    return {
      label: country.name,
      to: hrefOf(code),
      handlers: {
        style: {
          "--fill": fills.get(code) ?? EMPTY_FILL,
        } as CSSProperties,
        className: SHAPE_CLASS,
        onMouseEnter: () => onHover?.(country),
        onMouseLeave: () => onHover?.(null),
        onFocus: () => onHover?.(country),
        onBlur: () => onHover?.(null),
      },
    };
  };

  return (
    <div className="relative">
      <svg
        viewBox={map.viewBox}
        aria-label={label}
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
          const shapeProps = shape(country.code, country.name);
          const path = (
            <path
              d={country.d}
              strokeWidth={0.5}
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              {...shapeProps.handlers}
            />
          );

          return fills.has(country.code) ? (
            <Link
              key={`${country.code}-${country.name}`}
              to={shapeProps.to}
              aria-label={shapeProps.label}
            >
              {path}
            </Link>
          ) : (
            <g key={`${country.code}-${country.name}`}>{path}</g>
          );
        })}

        {islands.map((island) => {
          const shapeProps = shape(island.code, island.code);

          return (
            <Link
              key={island.code}
              to={shapeProps.to}
              aria-label={shapeProps.label}
            >
              <circle
                cx={island.x}
                cy={island.y}
                r={2.2 / Math.sqrt(map.zoom)}
                strokeWidth={0.75}
                vectorEffect="non-scaling-stroke"
                {...shapeProps.handlers}
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
