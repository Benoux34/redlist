import type { SpeciesLocation } from "@app/contracts";
import { useEffect, useRef } from "react";
import L from "leaflet";
import type { Feature, Geometry } from "geojson";
import {
  buildPopup,
  COLORS,
  isoA2Of,
  loadWorldGeoJson,
  presenceKindOf,
} from "./utils";
import type { CountryProperties } from "./entities";

type Props = Readonly<{
  locations: SpeciesLocation[];
}>;

const SpeciesMap = ({ locations }: Props) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mapContainerRef.current;
    if (container === null) return;

    let cancelled = false;

    const map = L.map(container, {
      center: [20, 0],
      zoom: 2,
      minZoom: 1,
      maxZoom: 8,
      scrollWheelZoom: false,
      worldCopyJump: true,
    });

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19,
      },
    ).addTo(map);

    const byCountryCode = new Map<string, SpeciesLocation>();

    for (const location of locations) {
      if (location.countryCode === null) continue;
      byCountryCode.set(location.countryCode.toUpperCase(), location);
    }

    void loadWorldGeoJson()
      .then((world) => {
        if (cancelled) return;

        const layer = L.geoJSON(world, {
          filter: (feature: Feature<Geometry, CountryProperties>) => {
            const code = isoA2Of(feature.properties);
            return code !== null && byCountryCode.has(code);
          },
          style: (feature) => {
            const code =
              feature === undefined ? null : isoA2Of(feature.properties);
            const location =
              code === null ? undefined : byCountryCode.get(code);
            const kind =
              location === undefined ? "current" : presenceKindOf(location);
            const palette = COLORS[kind];

            return {
              color: palette.stroke,
              weight: 1,
              fillColor: palette.fill,
              fillOpacity: kind === "past" ? 0.25 : 0.45,
              dashArray: kind === "past" ? "3, 3" : undefined,
            };
          },
          onEachFeature: (feature, featureLayer) => {
            const code = isoA2Of(feature.properties);
            const location =
              code === null ? undefined : byCountryCode.get(code);

            if (location === undefined) return;

            featureLayer.bindPopup(buildPopup(location));
            featureLayer.on({
              mouseover: (event) => {
                (event.target as L.Path).setStyle({
                  weight: 2,
                  fillOpacity: 0.6,
                });
              },
              mouseout: (event) => {
                layer.resetStyle(event.target as L.Path);
              },
            });
          },
        }).addTo(map);

        const bounds = layer.getBounds();

        if (bounds.isValid())
          map.fitBounds(bounds, { padding: [40, 40], maxZoom: 6 });
      })
      .catch((error: unknown) => {
        console.error("World GeoJSON failed", error);
      });

    return () => {
      cancelled = true;
      map.remove();
    };
  }, [locations]);

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--color-ink-muted)]">
        <span className="font-serif italic">
          Pays de présence documentés par l&apos;UICN
        </span>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 border border-[#b93826] bg-[#dc3e26]/50" />
            <span>Présence actuelle</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 border border-dashed border-[#8a3b5c] bg-[#b4537a]/30" />
            <span>Incertaine ou disparue</span>
          </div>
        </div>
      </div>

      <div className="relative h-[380px] w-full overflow-hidden border border-[var(--color-paper-border)] sm:h-[420px]">
        <div
          ref={mapContainerRef}
          className="species-leaflet-map h-full w-full"
        />
      </div>
    </div>
  );
};

export { SpeciesMap };
