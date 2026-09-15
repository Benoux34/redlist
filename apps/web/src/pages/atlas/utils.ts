import type { RedListCountryCount } from "@app/contracts";
import type { CountryIndex } from "./entities";

function buildCountryIndex(
  counts: readonly RedListCountryCount[],
): CountryIndex {
  return new Map(
    counts.map((entry) => [entry.countryCode.toUpperCase(), entry]),
  );
}

function lookup(
  index: CountryIndex,
  iso: string | null | undefined,
): RedListCountryCount | null {
  if (iso === null || iso === undefined) return null;

  return index.get(iso.toUpperCase()) ?? null;
}

export { buildCountryIndex, lookup };
