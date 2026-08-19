import { z } from "zod";

const USER_AGENT = "freedom/0.1 (benoitantunes34130@gmail.com)";

const summaryResponse = z.object({
  type: z.string(),
  title: z.string(),
  extract: z.string().nullish(),
  thumbnail: z.object({ source: z.string() }).nullish(),
});

export type WikipediaSummary = {
  vernacularNameFr: string | null;
  photoUrl: string | null;
  description: string | null;
};

const MAX_RETRIES = 3;

export async function fetchSummary(
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

    if (response.status === 404) {
      return null;
    }

    if (response.status === 429) {
      const retryAfter = Number(response.headers.get("Retry-After") ?? 0);
      const waitMs = retryAfter > 0 ? retryAfter * 1000 : 5_000 * 2 ** attempt;

      console.warn(`Wikipedia 429, waiting ${waitMs}ms`);
      await new Promise((resolve) => setTimeout(resolve, waitMs));
      continue;
    }

    if (!response.ok) {
      throw new Error(`Wikipedia failed: ${response.status}`);
    }

    const summary = summaryResponse.parse(await response.json());

    if (summary.type === "disambiguation") {
      return null;
    }

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
