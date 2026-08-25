import type { WikipediaSummary } from "./entities";
import { MAX_RETRIES, USER_AGENT, summaryResponse } from "./utils";

async function fetchSummary(
  scientificName: string,
  lang: "fr" | "en" = "fr",
): Promise<WikipediaSummary | null> {
  const url =
    `https://${lang}.wikipedia.org/api/rest_v1/page/summary/` +
    encodeURIComponent(scientificName);

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    const response = await fetch(url, {
      headers: { Accept: "application/json", "User-Agent": USER_AGENT },
    });
    if (response.status === 404) return null;
    if (response.status === 429) {
      const retryAfter = Number(response.headers.get("Retry-After") ?? 0);
      const waitMs = retryAfter > 0 ? retryAfter * 1000 : 5_000 * 2 ** attempt;

      console.warn(`Wikipedia 429, waiting ${waitMs}ms`);
      await new Promise((resolve) => setTimeout(resolve, waitMs));
      continue;
    }
    if (!response.ok) throw new Error(`Wikipedia failed: ${response.status}`);

    const summary = summaryResponse.parse(await response.json());
    if (summary.type === "disambiguation") return null;

    const isTitleScientific =
      summary.title.toLowerCase() === scientificName.toLowerCase();

    return {
      vernacularNameFr: isTitleScientific ? null : summary.title,
      photoUrl: summary.thumbnail?.source ?? null,
      description: summary.extract ?? null,
    };
  }

  throw new Error("Wikipedia: rate limited after retries");
}

export { fetchSummary };
