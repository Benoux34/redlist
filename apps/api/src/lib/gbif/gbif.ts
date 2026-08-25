import { z } from "zod";

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

export type GbifMatch = z.infer<typeof matchResponse>;

async function matchTaxon(scientificName: string): Promise<GbifMatch | null> {
  const url = `${GBIF_BASE_URL}/species/match?name=${encodeURIComponent(scientificName)}`;

  const response = await fetch(url, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: { Accept: "application/json", "User-Agent": USER_AGENT },
  });

  if (!response.ok) throw new Error(`GBIF match failed: ${response.status}`);

  const parsed = matchResponse.parse(await response.json());

  return parsed.matchType === "NONE" ? null : parsed;
}

export { matchTaxon };
