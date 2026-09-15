import type { FeatureCollection, Geometry } from "geojson";

type CountryProperties = Readonly<{
  iso_a2: string | null;
  iso_a3: string | null;
  name: string;
  name_fr: string;
}>;

type WorldGeoJson = FeatureCollection<Geometry, CountryProperties>;

let cached: Promise<WorldGeoJson> | null = null;

function loadWorldGeoJson(): Promise<WorldGeoJson> {
  cached ??= fetch("/countries.geo.json").then((response) => {
    if (!response.ok)
      throw new Error(`Failed to load world GeoJSON: ${response.status}`);

    return response.json() as Promise<WorldGeoJson>;
  });

  return cached;
}

export { loadWorldGeoJson };
export type { CountryProperties, WorldGeoJson };
