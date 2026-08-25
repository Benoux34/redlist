import {
  HABITAT_FAMILY,
  IMPACT,
  lookup,
  ORIGIN,
  POPULATION_TREND,
  PRESENCE,
  REGION_NAMES,
  SCOPE,
  SEVERITY,
  SUITABILITY,
  SYSTEM,
  THREAT_FAMILY,
  TIMING,
} from "./utils";

const translatePopulationTrend = (value: string | null): string | null =>
  lookup(POPULATION_TREND, value);

const translateSystem = (value: string): string => SYSTEM[value] ?? value;

const translateSuitability = (value: string | null): string | null =>
  lookup(SUITABILITY, value);

const translatePresence = (value: string | null): string | null =>
  lookup(PRESENCE, value);

const translateOrigin = (value: string | null): string | null =>
  lookup(ORIGIN, value);

const translateTiming = (value: string | null): string | null =>
  lookup(TIMING, value);

const translateScope = (value: string | null): string | null =>
  lookup(SCOPE, value);

const translateSeverity = (value: string | null): string | null =>
  lookup(SEVERITY, value);

const translateImpact = (value: string | null): string | null =>
  lookup(IMPACT, value);

function translateThreatFamily(familyCode: string | null): string | null {
  if (familyCode === null) return null;

  return THREAT_FAMILY[familyCode] ?? null;
}

function translateHabitatFamily(
  familyCode: string | null,
  fallback: string,
): string {
  if (familyCode === null) return fallback;

  return HABITAT_FAMILY[familyCode] ?? fallback;
}

function translateCountry(
  countryCode: string | null,
  fallback: string,
): string {
  if (countryCode === null || countryCode.length !== 2) return fallback;

  try {
    return REGION_NAMES.of(countryCode) ?? fallback;
  } catch {
    return fallback;
  }
}

export {
  translatePopulationTrend,
  translateSystem,
  translateSuitability,
  translatePresence,
  translateOrigin,
  translateTiming,
  translateScope,
  translateSeverity,
  translateImpact,
  translateThreatFamily,
  translateHabitatFamily,
  translateCountry,
};
