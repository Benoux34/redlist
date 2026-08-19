const regionNames = new Intl.DisplayNames(["fr"], {
  type: "region",
  fallback: "none",
});

const PRESENCE_FR: Record<string, string> = {
  Extant: "Présente",
  "Possibly Extant": "Présence probable",
  "Possibly Extinct": "Probablement disparue",
  "Extinct Post-1500": "Disparue depuis 1500",
  "Presence Uncertain": "Présence incertaine",
};

const ORIGIN_FR: Record<string, string> = {
  Native: "Indigène",
  Reintroduced: "Réintroduite",
  Introduced: "Introduite",
  Vagrant: "Erratique",
  "Origin Uncertain": "Origine incertaine",
  "Assisted Colonisation": "Colonisation assistée",
};

const translateCountry = (
  countryCode: string | null,
  fallback: string,
): string => {
  if (!countryCode || countryCode.length !== 2) return fallback;
  try {
    return regionNames.of(countryCode) ?? fallback;
  } catch {
    return fallback;
  }
};

const translatePresence = (presence: string | null): string | null => {
  if (!presence) return null;
  return PRESENCE_FR[presence] ?? presence;
};

const translateOrigin = (origin: string | null): string | null => {
  if (!origin) return null;
  return ORIGIN_FR[origin] ?? origin;
};

export { translateCountry, translatePresence, translateOrigin };
