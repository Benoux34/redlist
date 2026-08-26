const DEFAULT_CATEGORIES = ["EX", "EW", "CR", "EN", "VU"] as const;
const BATCH_SIZE = 100;
const DESCRIPTION_SOURCE_FR = "wikipedia-fr";

const INAT = { concurrency: 2, delayMs: 2_000 };
const WIKI = { concurrency: 1, delayMs: 1_000 };

const CONSECUTIVE_FAILURE_LIMIT = 15;

const ROW_SELECT = {
  assessmentId: true,
  scientificName: true,
  photoUrl: true,
  vernacularNameFr: true,
} as const;

export {
  DEFAULT_CATEGORIES,
  BATCH_SIZE,
  DESCRIPTION_SOURCE_FR,
  INAT,
  WIKI,
  CONSECUTIVE_FAILURE_LIMIT,
  ROW_SELECT,
};
