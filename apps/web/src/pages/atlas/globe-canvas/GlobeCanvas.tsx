import { useEffect, useRef, useState } from "react";
import Globe from "globe.gl";
import type { Feature } from "geojson";
import { loadWorldGeoJson } from "@/lib/world-geojson";
import type { CountryProperties } from "@/lib/world-geojson";
import { Loading } from "@/components/loading/Loading";
import { choroplethColor } from "../country-panel/utils";
import type { CountryIndex } from "../entities";
import { lookup } from "../utils";
import {
  GLOBE_COLORS,
  INITIAL_ALTITUDE,
  MAX_DISTANCE,
  MIN_DISTANCE,
  ROTATION_SPEED,
  prefersReducedMotion,
} from "./utils";

type CountryFeature = Feature<never, CountryProperties>;

type Props = Readonly<{
  index: CountryIndex;
  onHover?: (country: CountryProperties | null) => void;
  onSelect?: (country: CountryProperties | null) => void;
}>;

const GlobeCanvas = ({ index, onHover, onSelect }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const globeRef = useRef<InstanceType<typeof Globe> | null>(null);
  const indexRef = useRef<CountryIndex>(index);
  const hoveredRef = useRef<object | null>(null);
  const hoverRef = useRef<Props["onHover"]>(onHover);
  const selectRef = useRef<Props["onSelect"]>(onSelect);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    hoverRef.current = onHover;
    selectRef.current = onSelect;
  }, [onHover, onSelect]);

  useEffect(() => {
    const container = containerRef.current;
    if (container === null) return;

    let disposed = false;
    let observer: ResizeObserver | null = null;

    const capColor = (entry: object): string => {
      if (entry === hoveredRef.current) return GLOBE_COLORS.landHover;

      const snapshot = lookup(
        indexRef.current,
        (entry as CountryFeature).properties.iso_a2,
      );

      return choroplethColor(snapshot === null ? null : snapshot.threatened);
    };

    const paint = () => {
      globeRef.current
        ?.polygonCapColor(capColor)
        .polygonAltitude((entry: object) =>
          entry === hoveredRef.current ? 0.02 : 0.008,
        );
    };

    loadWorldGeoJson()
      .then((world) => {
        if (disposed) return;

        const globe = new Globe(container)
          .width(container.clientWidth)
          .height(container.clientHeight)
          .backgroundColor("rgba(0,0,0,0)")
          .showAtmosphere(true)
          .atmosphereColor(GLOBE_COLORS.atmosphere)
          .atmosphereAltitude(0.16)
          .polygonsData(world.features)
          .polygonSideColor(() => GLOBE_COLORS.side)
          .polygonStrokeColor(() => GLOBE_COLORS.stroke)
          .polygonsTransitionDuration(0);

        globeRef.current = globe;
        paint();

        const material = globe.globeMaterial() as {
          color?: { set: (value: string) => void };
        };
        material.color?.set(GLOBE_COLORS.water);

        globe.onPolygonHover((hovered: object | null) => {
          hoveredRef.current = hovered;
          paint();

          container.style.cursor = hovered === null ? "grab" : "pointer";
          hoverRef.current?.(
            (hovered as CountryFeature | null)?.properties ?? null,
          );
        });

        globe.onPolygonClick((clicked: object) => {
          selectRef.current?.(
            (clicked as CountryFeature | null)?.properties ?? null,
          );
        });

        const controls = globe.controls();
        controls.enableZoom = true;
        controls.enablePan = false;
        controls.minDistance = MIN_DISTANCE;
        controls.maxDistance = MAX_DISTANCE;
        controls.autoRotate = !prefersReducedMotion();
        controls.autoRotateSpeed = ROTATION_SPEED;
        controls.dampingFactor = 0.12;

        globe.pointOfView({ lat: 20, lng: 10, altitude: INITIAL_ALTITUDE });

        const resize = () => {
          if (containerRef.current === null) return;

          globeRef.current
            ?.width(containerRef.current.clientWidth)
            .height(containerRef.current.clientHeight);
        };

        resize();
        observer = new ResizeObserver(resize);
        observer.observe(container);

        container.style.cursor = "grab";
        setStatus("ready");
      })
      .catch(() => {
        if (!disposed) setStatus("error");
      });

    return () => {
      disposed = true;
      observer?.disconnect();
      globeRef.current?._destructor();
      globeRef.current = null;
      container.replaceChildren();
    };
  }, []);

  useEffect(() => {
    indexRef.current = index;

    globeRef.current?.polygonCapColor((entry: object) => {
      if (entry === hoveredRef.current) return GLOBE_COLORS.landHover;

      const snapshot = lookup(
        index,
        (entry as CountryFeature).properties.iso_a2,
      );

      return choroplethColor(snapshot === null ? null : snapshot.threatened);
    });
  }, [index]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        ref={containerRef}
        className="h-full w-full min-w-0 overflow-hidden"
      />

      {status !== "ready" && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-paper)]">
          {status === "loading" ? (
            <Loading
              label="Chargement du globe…"
              minHeight="min-h-0"
              className="border-0 bg-transparent"
            />
          ) : (
            <p className="font-serif text-lg italic text-[var(--color-ink-muted)]">
              Le globe n&apos;a pas pu être chargé.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export { GlobeCanvas };
