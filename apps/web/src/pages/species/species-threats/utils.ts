const THREAT_FAMILY_FR: Record<string, string> = {
  "1": "Urbanisation & Logement",
  "2": "Agriculture & Aquaculture",
  "3": "Énergie & Exploitation minière",
  "4": "Transports & Infrastructures",
  "5": "Exploitation des ressources biologiques",
  "6": "Dérangement humain & Loisirs",
  "7": "Modifications des écosystèmes",
  "8": "Espèces invasives & Pathogènes",
  "9": "Pollution",
  "10": "Phénomènes géologiques",
  "11": "Changement climatique",
  "12": "Autres menaces",
};

const HABITAT_FAMILY_FR: Record<string, string> = {
  "1": "Forêt",
  "2": "Savane",
  "3": "Landes & Fourrés",
  "4": "Prairies & Steppes",
  "5": "Zones humides & Eaux continentales",
  "6": "Milieux rocheux & Falaises",
  "7": "Grottes & Milieux souterrains",
  "8": "Désert",
  "9": "Milieu marin côtier",
  "10": "Océan ouvert",
  "11": "Fonds marins profonds",
  "12": "Estran marin",
  "13": "Littoral côtier",
  "14": "Milieux artificiels terrestres",
  "15": "Milieux artificiels aquatiques",
  "16": "Végétation introduite",
  "17": "Autre",
  "18": "Inconnu",
};

const TIMING_FR: Record<string, string> = {
  Ongoing: "En cours",
  Future: "À venir",
  "Past, Likely to Return": "Passée (récurrente)",
  "Past, Unlikely to Return": "Passée",
};

const SCOPE_FR: Record<string, string> = {
  "Minority (<50%)": "< 50% pop.",
  "Majority (50-90%)": "50-90% pop.",
  "Whole (>90%)": "> 90% pop.",
  Unknown: "Étendue inconnue",
};

const SEVERITY_FR: Record<string, string> = {
  "Very Rapid Declines": "Déclin très rapide",
  "Rapid Declines": "Déclin rapide",
  "Slow, Significant Declines": "Déclin lent",
  "Causing/Could cause fluctuations": "Fluctuations",
  "Negligible declines": "Déclin négligeable",
  "No decline": "Aucun déclin",
};

const SUITABILITY_FR: Record<string, string> = {
  Suitable: "Favorable",
  Marginal: "Marginal",
  Unknown: "Inconnu",
};

const translateThreatFamily = (familyCode: string | null): string | null => {
  if (!familyCode) return null;
  return THREAT_FAMILY_FR[familyCode] ?? null;
};

const translateHabitatFamily = (
  familyCode: string | null,
  fallback: string,
): string => {
  if (!familyCode) return fallback;
  return HABITAT_FAMILY_FR[familyCode] ?? fallback;
};

const translateTiming = (timing: string | null): string | null => {
  if (!timing) return null;
  return TIMING_FR[timing] ?? timing;
};

const translateScope = (scope: string | null): string | null => {
  if (!scope) return null;
  return SCOPE_FR[scope] ?? scope;
};

const translateSeverity = (severity: string | null): string | null => {
  if (!severity) return null;
  return SEVERITY_FR[severity] ?? severity;
};

const translateSuitability = (suitability: string | null): string | null => {
  if (!suitability) return null;
  return SUITABILITY_FR[suitability] ?? suitability;
};

export {
  translateThreatFamily,
  translateHabitatFamily,
  translateTiming,
  translateScope,
  translateSeverity,
  translateSuitability,
};
