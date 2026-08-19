import type { FeatureCollection, Geometry } from "geojson";

type CountryProperties = Readonly<{
  iso_a2: string | null;
  iso_a3: string | null;
  name: string;
  name_fr: string;
}>;

type WorldGeoJson = FeatureCollection<Geometry, CountryProperties>;

type PresenceKind = "current" | "past";

export type { CountryProperties, WorldGeoJson, PresenceKind };
