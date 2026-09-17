import type { SpeciesGroup } from "@app/contracts";

type MapCountry = Readonly<{
  code: string;
  name: string;
}>;

type MapStatus = "threatened" | "EX" | "EW" | "CR" | "EN" | "VU";

type MapFilters = Readonly<{
  status: MapStatus;
  group: SpeciesGroup | null;
}>;

type CountryValues = ReadonlyMap<string, number>;

type ScaleStep = Readonly<{
  min: number;
  color: string;
}>;

type MapPoint = Readonly<{
  x: number;
  y: number;
}>;

type MapBounds = MapPoint &
  Readonly<{
    width: number;
    height: number;
  }>;

export type {
  CountryValues,
  MapBounds,
  MapCountry,
  MapFilters,
  MapPoint,
  MapStatus,
  ScaleStep,
};
