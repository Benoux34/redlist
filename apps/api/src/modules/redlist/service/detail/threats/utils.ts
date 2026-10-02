import type { ThreatCause, ThreatImpact } from "@app/contracts";

const CAUSE_BY_FAMILY: Record<string, ThreatCause> = {
  "1": "habitat",
  "2": "habitat",
  "3": "habitat",
  "4": "habitat",
  "5": "exploitation",
  "6": "habitat",
  "7": "habitat",
  "8": "invasive",
  "9": "pollution",
  "10": "other",
  "11": "climate",
  "12": "other",
};

const CAUSE_ORDER: readonly ThreatCause[] = [
  "habitat",
  "exploitation",
  "climate",
  "pollution",
  "invasive",
  "other",
];

const THREAT_LABELS: Record<string, string> = {
  "1_1": "Urbanisation et logements",
  "1_2": "Zones commerciales et industrielles",
  "1_3": "Aménagements touristiques",
  "2_1": "Cultures agricoles",
  "2_2": "Plantations (bois, huile de palme…)",
  "2_3": "Élevage",
  "2_4": "Aquaculture",
  "3_1": "Forages pétroliers et gaziers",
  "3_2": "Mines et carrières",
  "3_3": "Installations d'énergie renouvelable",
  "4_1": "Routes et voies ferrées",
  "4_2": "Lignes électriques et réseaux",
  "4_3": "Trafic maritime",
  "4_4": "Trafic aérien",
  "5_1": "Chasse, piégeage et persécution",
  "5_2": "Cueillette de plantes sauvages",
  "5_3": "Exploitation forestière",
  "5_4": "Pêche",
  "6_1": "Loisirs et fréquentation humaine",
  "6_2": "Conflits armés et activités militaires",
  "6_3": "Travaux et dérangements",
  "7_1": "Incendies",
  "7_2": "Barrages et gestion de l'eau",
  "7_3": "Autres transformations des milieux",
  "8_1": "Espèces introduites envahissantes",
  "8_2": "Espèces locales devenues nuisibles",
  "8_3": "Croisements avec des espèces introduites",
  "8_4": "Espèces ou maladies d'origine inconnue",
  "8_5": "Maladies virales",
  "8_6": "Maladies de cause inconnue",
  "9_1": "Eaux usées",
  "9_2": "Rejets industriels",
  "9_3": "Pesticides et engrais",
  "9_4": "Déchets et plastiques",
  "9_5": "Pollution de l'air",
  "9_6": "Bruit, lumière et chaleur",
  "10_1": "Volcans",
  "10_2": "Séismes et tsunamis",
  "10_3": "Avalanches et glissements de terrain",
  "11_1": "Transformation des habitats par le climat",
  "11_2": "Sécheresses",
  "11_3": "Températures extrêmes",
  "11_4": "Tempêtes et inondations",
  "11_5": "Autres effets du climat",
  "12_1": "Autre menace",
};

const IMPACT_BY_LABEL: Record<string, ThreatImpact> = {
  "High Impact": "high",
  "Medium Impact": "medium",
  "Low Impact": "low",
  "No/Negligible Impact": "negligible",
  "Past Impact": "past",
};

const IMPACT_RANK: Record<ThreatImpact, number> = {
  high: 5,
  medium: 4,
  low: 3,
  unknown: 2,
  negligible: 1,
  past: 0,
};

const IMPACT_LABELS: Record<ThreatImpact, string> = {
  high: "Impact fort",
  medium: "Impact moyen",
  low: "Impact faible",
  negligible: "Impact négligeable",
  past: "Menace passée",
  unknown: "Impact non évalué",
};

const IMPACT_LEVELS: Record<ThreatImpact, number> = {
  high: 3,
  medium: 2,
  low: 1,
  negligible: 0,
  past: 0,
  unknown: 0,
};

const TIMING_LABELS: Record<string, string> = {
  Ongoing: "En cours",
  Future: "À venir",
  "Past, Likely to Return": "Passée, peut revenir",
  "Past, Unlikely to Return": "Passée",
};

const SCOPE_LABELS: Record<string, string> = {
  "Minority (<50%)": "Moins de la moitié",
  "Majority (50-90%)": "La majorité (50 à 90 %)",
  "Whole (>90%)": "Presque toute (> 90 %)",
};

const SEVERITY_LABELS: Record<string, string> = {
  "Very Rapid Declines": "Déclin très rapide",
  "Rapid Declines": "Déclin rapide",
  "Slow, Significant Declines": "Déclin lent mais réel",
  "Causing/Could cause fluctuations": "Fluctuations",
  "Negligible declines": "Déclin négligeable",
  "No decline": "Aucun déclin",
};

export {
  CAUSE_BY_FAMILY,
  CAUSE_ORDER,
  IMPACT_BY_LABEL,
  IMPACT_LABELS,
  IMPACT_LEVELS,
  IMPACT_RANK,
  SCOPE_LABELS,
  SEVERITY_LABELS,
  THREAT_LABELS,
  TIMING_LABELS,
};
