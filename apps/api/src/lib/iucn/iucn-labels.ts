const POPULATION_TREND: Record<string, string> = {
  Decreasing: "En déclin",
  Increasing: "En augmentation",
  Stable: "Stable",
  Unknown: "Inconnue",
};

const SYSTEM: Record<string, string> = {
  Terrestrial: "Terrestre",
  "Freshwater (=Inland waters)": "Eau douce",
  Marine: "Marin",
};

const SUITABILITY: Record<string, string> = {
  Suitable: "Favorable",
  Marginal: "Marginal",
  Unknown: "Inconnu",
};

const PRESENCE: Record<string, string> = {
  Extant: "Présente",
  "Possibly Extant": "Présence probable",
  "Possibly Extinct": "Probablement disparue",
  "Extinct Post-1500": "Disparue depuis 1500",
  "Presence Uncertain": "Présence incertaine",
};

const ORIGIN: Record<string, string> = {
  Native: "Indigène",
  Reintroduced: "Réintroduite",
  Introduced: "Introduite",
  Vagrant: "Erratique",
  "Origin Uncertain": "Origine incertaine",
  "Assisted Colonisation": "Colonisation assistée",
};

const TIMING: Record<string, string> = {
  Ongoing: "En cours",
  Future: "À venir",
  "Past, Likely to Return": "Passée, susceptible de revenir",
  "Past, Unlikely to Return": "Passée, peu susceptible de revenir",
};

const SCOPE: Record<string, string> = {
  "Minority (<50%)": "Une minorité de la population",
  "Majority (50-90%)": "La majorité de la population",
  "Whole (>90%)": "Toute la population",
  Unknown: "Étendue inconnue",
};

const SEVERITY: Record<string, string> = {
  "Very Rapid Declines": "Déclin très rapide",
  "Rapid Declines": "Déclin rapide",
  "Slow, Significant Declines": "Déclin lent mais significatif",
  "Causing/Could cause fluctuations": "Provoque des fluctuations",
  "Negligible declines": "Déclin négligeable",
  "No decline": "Pas de déclin",
};

const IMPACT: Record<string, string> = {
  "No/Negligible Impact": "Impact négligeable",
  "Low Impact": "Impact faible",
  "Medium Impact": "Impact moyen",
  "High Impact": "Impact élevé",
};

const THREAT_FAMILY: Record<string, string> = {
  "1": "Urbanisation",
  "2": "Agriculture et aquaculture",
  "3": "Extraction énergétique et minière",
  "4": "Transports et infrastructures",
  "5": "Exploitation des ressources biologiques",
  "6": "Dérangement humain",
  "7": "Modification des milieux naturels",
  "8": "Espèces envahissantes et maladies",
  "9": "Pollution",
  "10": "Événements géologiques",
  "11": "Changement climatique",
  "12": "Autres menaces",
};

const HABITAT_FAMILY: Record<string, string> = {
  "1": "Forêt",
  "2": "Savane",
  "3": "Landes et fourrés",
  "4": "Prairies",
  "5": "Zones humides continentales",
  "6": "Milieux rocheux",
  "7": "Grottes et milieux souterrains",
  "8": "Désert",
  "9": "Milieu marin néritique",
  "10": "Milieu marin océanique",
  "11": "Milieu marin profond",
  "12": "Estran marin",
  "13": "Littoral marin",
  "14": "Milieux artificiels terrestres",
  "15": "Milieux artificiels aquatiques",
  "16": "Végétation introduite",
  "17": "Autre",
  "18": "Inconnu",
};

function lookup(
  dictionary: Record<string, string>,
  value: string | null,
): string | null {
  if (value === null) return null;

  return dictionary[value] ?? value;
}

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

const regionNames = new Intl.DisplayNames(["fr"], {
  type: "region",
  fallback: "none",
});

function translateCountry(
  countryCode: string | null,
  fallback: string,
): string {
  if (countryCode === null || countryCode.length !== 2) return fallback;

  try {
    return regionNames.of(countryCode) ?? fallback;
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
