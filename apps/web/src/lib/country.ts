const regionNames = new Intl.DisplayNames(["fr"], {
  type: "region",
  fallback: "none",
});

const UNKNOWN_REGION = regionNames.of("ZZ");
const COUNTRY_CODE_PATTERN = /^[A-Za-z]{2}$/;

function resolveRegion(countryCode: string): string | null {
  try {
    const name = regionNames.of(countryCode.toUpperCase());

    return name === undefined || name === UNKNOWN_REGION ? null : name;
  } catch {
    return null;
  }
}

function translateCountry(
  countryCode: string | null,
  fallback: string,
): string {
  if (!countryCode || !COUNTRY_CODE_PATTERN.test(countryCode)) return fallback;

  return resolveRegion(countryCode) ?? fallback;
}

function normalizeCountryCode(raw: string | undefined): string | null {
  if (raw === undefined || !COUNTRY_CODE_PATTERN.test(raw)) return null;

  return resolveRegion(raw) === null ? null : raw.toUpperCase();
}

export { translateCountry, normalizeCountryCode };
