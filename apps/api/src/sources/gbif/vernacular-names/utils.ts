import z from "zod";

const GBIF_BASE_URL = "https://api.gbif.org/v1";
const USER_AGENT = "Freedom/0.1 (contact@example.com)";
const TIMEOUT_MS = 15_000;
const PAGE_LIMIT = 100;

const FRENCH_CODES = new Set(["fra", "fr"]);

const vernacularNamesResponse = z.object({
  results: z.array(
    z.object({
      vernacularName: z.string(),
      language: z.string().nullish(),
      preferred: z.boolean().nullish(),
    }),
  ),
});

export {
  FRENCH_CODES,
  GBIF_BASE_URL,
  PAGE_LIMIT,
  TIMEOUT_MS,
  USER_AGENT,
  vernacularNamesResponse,
};
