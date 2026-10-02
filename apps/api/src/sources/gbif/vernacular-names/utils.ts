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

function pickFrenchName(
  candidates: readonly Readonly<{
    vernacularName: string;
    preferred?: boolean | null | undefined;
  }>[],
): string | null {
  const preferred = candidates.find((entry) => entry.preferred === true);
  if (preferred !== undefined) return preferred.vernacularName.trim();

  const counts = new Map<string, { name: string; count: number }>();

  for (const entry of candidates) {
    const name = entry.vernacularName.trim();
    if (name.length === 0) continue;

    const key = name.toLowerCase();
    const seen = counts.get(key);

    if (seen === undefined) counts.set(key, { name, count: 1 });
    else seen.count += 1;
  }

  let best: { name: string; count: number } | null = null;

  for (const entry of counts.values())
    if (best === null || entry.count > best.count) best = entry;

  return best?.name ?? null;
}

export {
  FRENCH_CODES,
  GBIF_BASE_URL,
  PAGE_LIMIT,
  TIMEOUT_MS,
  USER_AGENT,
  vernacularNamesResponse,
  pickFrenchName,
};
