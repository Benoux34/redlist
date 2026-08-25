import type { GbifMatch } from "./entities";
import { matchResponse, GBIF_BASE_URL, USER_AGENT, TIMEOUT_MS } from "./utils";

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
