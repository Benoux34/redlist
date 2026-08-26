type Row = {
  assessmentId: number;
  scientificName: string;
  photoUrl: string | null;
  vernacularNameFr: string | null;
};

type PassOptions = {
  name: string;
  cursorField: "descriptionFetchedAt" | "mediaFetchedAt";
  concurrency: number;
  delayMs: number;
  enrich: (row: Row) => Promise<boolean>;
};

export type { Row, PassOptions };
