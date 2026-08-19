import { z } from "zod";

const INAT_BASE_URL = "https://api.inaturalist.org/v1";
const USER_AGENT = "Freedom/0.1 (contact@example.com)";

/** Licences that allow reuse with attribution. Anything else is off-limits. */
const ALLOWED_LICENSES = new Set([
  "cc0",
  "cc-by",
  "cc-by-nc",
  "cc-by-sa",
  "cc-by-nc-sa",
]);

const photo = z.object({
  medium_url: z.string().nullish(),
  square_url: z.string().nullish(),
  license_code: z.string().nullish(),
  attribution: z.string().nullish(),
});

const taxon = z.object({
  id: z.number().int(),
  name: z.string(),
  preferred_common_name: z.string().nullish(),
  default_photo: photo.nullish(),
});

const taxaResponse = z.object({
  results: z.array(taxon).default([]),
});

export type InatMedia = {
  vernacularNameFr: string | null;
  photoUrl: string | null;
  photoAttribution: string | null;
  photoLicense: string | null;
};

export async function fetchMedia(
  scientificName: string,
): Promise<InatMedia | null> {
  const url =
    `${INAT_BASE_URL}/taxa?q=${encodeURIComponent(scientificName)}` +
    `&rank=species&locale=fr&per_page=1`;

  const response = await fetch(url, {
    headers: { Accept: "application/json", "User-Agent": USER_AGENT },
  });

  if (!response.ok) {
    throw new Error(`iNaturalist failed: ${response.status}`);
  }

  const [result] = taxaResponse.parse(await response.json()).results;

  if (
    result === undefined ||
    result.name.toLowerCase() !== scientificName.toLowerCase()
  ) {
    return null;
  }

  const license = result.default_photo?.license_code ?? null;
  const isUsable = license !== null && ALLOWED_LICENSES.has(license);

  return {
    vernacularNameFr: result.preferred_common_name ?? null,
    photoUrl: isUsable ? (result.default_photo?.medium_url ?? null) : null,
    photoAttribution: isUsable
      ? (result.default_photo?.attribution ?? null)
      : null,
    photoLicense: license,
  };
}
