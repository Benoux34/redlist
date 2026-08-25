import z from "zod";

const GBIF_BASE_URL = "https://api.gbif.org/v1";
const USER_AGENT = "Freedom/0.1 (contact@example.com)";
const TIMEOUT_MS = 15_000;

const matchResponse = z.object({
  usageKey: z.number().int().nullish(),
  matchType: z.string(),
  confidence: z.number().nullish(),
  kingdom: z.string().nullish(),
  phylum: z.string().nullish(),
  class: z.string().nullish(),
  order: z.string().nullish(),
  family: z.string().nullish(),
});

export { matchResponse, USER_AGENT, GBIF_BASE_URL, TIMEOUT_MS };
