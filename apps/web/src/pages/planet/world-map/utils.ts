import type { Position } from "geojson";
import type { WorldGeoJson } from "../../../lib/world-geojson";
import type { MapBounds, MapPoint } from "../entities";

const SCALE = 100;
const A1 = 1.340264;
const A2 = -0.081106;
const A3 = 0.000893;
const A4 = 0.003796;
const M = Math.sqrt(3) / 2;

const ISLANDS: readonly Readonly<{ code: string; lat: number; lng: number }>[] =
  [
    { code: "AD", lat: 42.5, lng: 1.5 },
    { code: "MC", lat: 43.73, lng: 7.42 },
    { code: "SM", lat: 43.94, lng: 12.46 },
    { code: "VA", lat: 41.9, lng: 12.45 },
    { code: "LI", lat: 47.16, lng: 9.55 },
    { code: "MT", lat: 35.9, lng: 14.4 },
    { code: "GI", lat: 36.14, lng: -5.35 },
    { code: "FO", lat: 62, lng: -6.8 },
    { code: "AX", lat: 60.2, lng: 20 },
    { code: "GG", lat: 49.45, lng: -2.58 },
    { code: "JE", lat: 49.21, lng: -2.13 },
    { code: "IM", lat: 54.23, lng: -4.55 },
    { code: "SJ", lat: 78, lng: 16 },
    { code: "MU", lat: -20.3, lng: 57.6 },
    { code: "SC", lat: -4.68, lng: 55.49 },
    { code: "RE", lat: -21.1, lng: 55.5 },
    { code: "YT", lat: -12.8, lng: 45.15 },
    { code: "KM", lat: -11.9, lng: 43.9 },
    { code: "CV", lat: 16, lng: -24 },
    { code: "ST", lat: 0.2, lng: 6.6 },
    { code: "SH", lat: -15.95, lng: -5.7 },
    { code: "IO", lat: -6.3, lng: 71.9 },
    { code: "MV", lat: 3.2, lng: 73.2 },
    { code: "SG", lat: 1.35, lng: 103.8 },
    { code: "BH", lat: 26.07, lng: 50.55 },
    { code: "HK", lat: 22.3, lng: 114.2 },
    { code: "MO", lat: 22.2, lng: 113.55 },
    { code: "CX", lat: -10.49, lng: 105.62 },
    { code: "CC", lat: -12.16, lng: 96.87 },
    { code: "AG", lat: 17.1, lng: -61.8 },
    { code: "AI", lat: 18.22, lng: -63.05 },
    { code: "AW", lat: 12.5, lng: -69.97 },
    { code: "BB", lat: 13.19, lng: -59.54 },
    { code: "BL", lat: 17.9, lng: -62.83 },
    { code: "BM", lat: 32.3, lng: -64.78 },
    { code: "BQ", lat: 12.18, lng: -68.25 },
    { code: "CW", lat: 12.17, lng: -68.99 },
    { code: "DM", lat: 15.41, lng: -61.37 },
    { code: "GD", lat: 12.12, lng: -61.68 },
    { code: "GP", lat: 16.25, lng: -61.55 },
    { code: "KN", lat: 17.3, lng: -62.73 },
    { code: "KY", lat: 19.3, lng: -81.25 },
    { code: "LC", lat: 13.9, lng: -60.97 },
    { code: "MF", lat: 18.07, lng: -63.05 },
    { code: "MQ", lat: 14.64, lng: -61.02 },
    { code: "MS", lat: 16.74, lng: -62.19 },
    { code: "SX", lat: 18.04, lng: -63.07 },
    { code: "TC", lat: 21.69, lng: -71.8 },
    { code: "VC", lat: 13.25, lng: -61.2 },
    { code: "VG", lat: 18.42, lng: -64.64 },
    { code: "VI", lat: 18.34, lng: -64.9 },
    { code: "PM", lat: 46.9, lng: -56.3 },
    { code: "GF", lat: 4, lng: -53 },
    { code: "GS", lat: -54.4, lng: -36.6 },
    { code: "BV", lat: -54.42, lng: 3.36 },
    { code: "UM", lat: 19.28, lng: 166.6 },
    { code: "AS", lat: -14.3, lng: -170.7 },
    { code: "CK", lat: -21.24, lng: -159.78 },
    { code: "FM", lat: 6.9, lng: 158.2 },
    { code: "GU", lat: 13.44, lng: 144.79 },
    { code: "HM", lat: -53.1, lng: 73.5 },
    { code: "KI", lat: 1.45, lng: 173 },
    { code: "MH", lat: 7.1, lng: 171.2 },
    { code: "MP", lat: 15.1, lng: 145.7 },
    { code: "NF", lat: -29.04, lng: 167.95 },
    { code: "NR", lat: -0.52, lng: 166.93 },
    { code: "NU", lat: -19.05, lng: -169.87 },
    { code: "PF", lat: -17.65, lng: -149.4 },
    { code: "PN", lat: -25.07, lng: -130.1 },
    { code: "PW", lat: 7.5, lng: 134.6 },
    { code: "TK", lat: -9.2, lng: -171.85 },
    { code: "TO", lat: -21.18, lng: -175.2 },
    { code: "TV", lat: -8.52, lng: 179.2 },
    { code: "WF", lat: -13.77, lng: -177.16 },
    { code: "WS", lat: -13.76, lng: -172.1 },
  ];

function project([lng = 0, lat = 0]: Position): [number, number] {
  const lambda = (lng * Math.PI) / 180;
  const theta = Math.asin(M * Math.sin((lat * Math.PI) / 180));
  const t2 = theta * theta;
  const t6 = t2 * t2 * t2;

  const x =
    (lambda * Math.cos(theta)) /
    (M * (A1 + 3 * A2 * t2 + t6 * (7 * A3 + 9 * A4 * t2)));
  const y = theta * (A1 + A2 * t2 + t6 * (A3 + A4 * t2));

  return [x * SCALE, -y * SCALE];
}

function ringPath(ring: readonly Position[]): string {
  return `${ring
    .map((position, i) => {
      const [x, y] = project(position);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join("")}Z`;
}

function buildCountryPaths(world: WorldGeoJson) {
  return world.features.map(({ geometry, properties }) => {
    const polygons =
      geometry.type === "Polygon"
        ? [geometry.coordinates]
        : geometry.type === "MultiPolygon"
          ? geometry.coordinates
          : [];

    return {
      code: properties.iso_a2?.toUpperCase() ?? "",
      name: properties.name_fr || properties.name,
      d: polygons.map((polygon) => polygon.map(ringPath).join("")).join(""),
    };
  });
}

const ISLAND_POINTS = ISLANDS.map((island) => {
  const [x, y] = project([island.lng, island.lat]);

  return { code: island.code, x, y };
});

const meridian = (lng: number): Position[] =>
  Array.from({ length: 37 }, (_, i) => [lng, 90 - i * 5]);

const OUTLINE_PATH = ringPath([...meridian(180), ...meridian(-180).reverse()]);

const [LEFT, TOP] = [project([-180, 0])[0], project([0, 90])[1]];

const MAP_BOUNDS: MapBounds = {
  x: LEFT - 1,
  y: TOP - 1,
  width: -2 * LEFT + 2,
  height: -2 * TOP + 2,
};

const MIN_ZOOM = 1;
const MAX_ZOOM = 8;
const ZOOM_STEP = 2;

function clampCenter(
  bounds: MapBounds,
  zoom: number,
  center: MapPoint,
): MapPoint {
  const halfWidth = bounds.width / zoom / 2;
  const halfHeight = bounds.height / zoom / 2;
  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  return {
    x: clamp(
      center.x,
      bounds.x + halfWidth,
      bounds.x + bounds.width - halfWidth,
    ),
    y: clamp(
      center.y,
      bounds.y + halfHeight,
      bounds.y + bounds.height - halfHeight,
    ),
  };
}

function zoomedViewBox(
  bounds: MapBounds,
  zoom: number,
  center: MapPoint,
): string {
  const { x, y } = clampCenter(bounds, zoom, center);
  const width = bounds.width / zoom;
  const height = bounds.height / zoom;

  return `${x - width / 2} ${y - height / 2} ${width} ${height}`;
}

export {
  ISLAND_POINTS,
  MAP_BOUNDS,
  MAX_ZOOM,
  MIN_ZOOM,
  OUTLINE_PATH,
  ZOOM_STEP,
  buildCountryPaths,
  clampCenter,
  zoomedViewBox,
};
