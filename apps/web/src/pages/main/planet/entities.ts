import type { SpeciesGroup } from "@app/contracts";

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

export type { CountryValues, MapFilters, MapStatus, ScaleStep };
