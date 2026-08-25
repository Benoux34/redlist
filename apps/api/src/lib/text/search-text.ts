import { COMBINING_MARKS, WHITESPACE } from "./utils";

function normalizeForSearch(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(COMBINING_MARKS, "")
    .replace(WHITESPACE, " ");
}

function buildSearchText(
  scientificName: string,
  vernacularNameFr: string | null,
): string {
  return normalizeForSearch(
    vernacularNameFr === null
      ? scientificName
      : `${scientificName} ${vernacularNameFr}`,
  );
}

export { buildSearchText, normalizeForSearch };
