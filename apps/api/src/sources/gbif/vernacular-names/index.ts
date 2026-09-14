import {
  FRENCH_CODES,
  GBIF_BASE_URL,
  PAGE_LIMIT,
  TIMEOUT_MS,
  USER_AGENT,
  vernacularNamesResponse,
} from "./utils";
import { pickFrenchName } from "./pick";

async function fetchFrenchVernacularName(
  usageKey: number,
): Promise<string | null> {
  const url = `${GBIF_BASE_URL}/species/${usageKey}/vernacularNames?limit=${PAGE_LIMIT}`;

  const response = await fetch(url, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: { Accept: "application/json", "User-Agent": USER_AGENT },
  });

  if (response.status === 404) return null;
  if (!response.ok)
    throw new Error(`GBIF vernacularNames failed: ${response.status}`);

  const parsed = vernacularNamesResponse.parse(await response.json());

  return pickFrenchName(
    parsed.results.filter((entry) =>
      FRENCH_CODES.has((entry.language ?? "").toLowerCase()),
    ),
  );
}

export { fetchFrenchVernacularName };
