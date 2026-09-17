type MapCountry = Readonly<{
  code: string;
  name: string;
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

export type { MapBounds, MapCountry, MapPoint };
