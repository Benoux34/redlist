import {
  INAT_BASE_URL,
  USER_AGENT,
  ALLOWED_LICENSES,
  taxaResponse,
} from "./utils";
import type { InatMedia } from "./entities";

async function fetchMedia(scientificName: string): Promise<InatMedia | null> {
  const url =
    `${INAT_BASE_URL}/taxa?q=${encodeURIComponent(scientificName)}` +
    `&rank=species&locale=fr&per_page=1`;

  const response = await fetch(url, {
    headers: { Accept: "application/json", "User-Agent": USER_AGENT },
  });
  if (!response.ok) throw new Error(`iNaturalist failed: ${response.status}`);

  const [result] = taxaResponse.parse(await response.json()).results;
  if (
    result === undefined ||
    result.name.toLowerCase() !== scientificName.toLowerCase()
  )
    return null;

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

export { fetchMedia };
