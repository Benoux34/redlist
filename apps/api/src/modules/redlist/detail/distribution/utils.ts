import type { PresenceKind } from "@app/contracts";

const COUNTRY_CODE = /^[A-Z]{2}$/;

const PRESENCE_BY_LABEL: Record<string, PresenceKind> = {
  Extant: "current",
  "Possibly Extant": "current",
  "Presence Uncertain": "uncertain",
  "Possibly Extinct": "extinct",
  "Extinct Post-1500": "extinct",
};

const PRESENCE_ORDER: readonly PresenceKind[] = [
  "current",
  "uncertain",
  "extinct",
];

const PRESENCE_LABELS: Record<PresenceKind, string> = {
  current: "Encore présente",
  uncertain: "Présence incertaine",
  extinct: "Disparue",
};

const HABITAT_LABELS: Record<string, string> = {
  "1": "Forêt",
  "2": "Savane",
  "3": "Broussailles",
  "4": "Prairies et steppes",
  "5": "Zones humides",
  "6": "Milieux rocheux",
  "7": "Grottes",
  "8": "Désert",
  "9": "Mer peu profonde",
  "10": "Océan ouvert",
  "11": "Grands fonds marins",
  "12": "Estran",
  "13": "Littoral",
  "14": "Milieux cultivés ou urbains",
  "15": "Plans d'eau artificiels",
  "16": "Végétation introduite",
};

const regionNames = new Intl.DisplayNames(["fr"], {
  type: "region",
  fallback: "none",
});

export {
  COUNTRY_CODE,
  HABITAT_LABELS,
  PRESENCE_BY_LABEL,
  PRESENCE_LABELS,
  PRESENCE_ORDER,
  regionNames,
};
