import type { MeasureStatus } from "@app/contracts";

const GROUP_TITLES: Record<string, string> = {
  "In-place land/water protection": "Protection des milieux",
  "In-place species management": "Gestion de l'espèce",
  "In-place research and monitoring": "Recherche et suivi",
  "In-place education": "Lois et sensibilisation",
};

const GROUP_ORDER = Object.values(GROUP_TITLES);

const MEASURE_LABELS: Record<string, string> = {
  "Occurs in at least one protected area":
    "Présente dans au moins une aire protégée",
  "Percentage of population protected by PAs":
    "Population vivant en aire protégée",
  "Conservation sites identified":
    "Sites prioritaires de conservation identifiés",
  "Area based regional management plan": "Plan de gestion régional",
  "Invasive species control or prevention":
    "Lutte contre les espèces envahissantes",
  "Action Recovery Plan": "Plan national de sauvegarde",
  "Systematic monitoring scheme": "Suivi régulier des populations",
  "Harvest management plan": "Encadrement de la chasse, pêche ou cueillette",
  "Subject to ex-situ conservation": "Élevage ou culture en captivité",
  "Successfully reintroduced or introduced benignly": "Réintroduction réussie",
  "Subject to recent education and awareness programmes":
    "Programmes de sensibilisation du public",
  "Included in international legislation":
    "Protégée par des accords internationaux",
  "Subject to any international management / trade controls":
    "Commerce international encadré",
};

const PROTECTED_SHARE = "Percentage of population protected by PAs";

const STATUS_RANK: Record<MeasureStatus, number> = {
  yes: 0,
  partial: 1,
  no: 2,
};

export {
  GROUP_ORDER,
  GROUP_TITLES,
  MEASURE_LABELS,
  PROTECTED_SHARE,
  STATUS_RANK,
};
