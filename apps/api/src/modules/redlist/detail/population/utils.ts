import type { PopulationTrend } from "@app/contracts";

const TRENDS: Record<PopulationTrend, { label: string; text: string }> = {
  Decreasing: {
    label: "En déclin",
    text: "Le nombre d'individus diminue d'une évaluation à l'autre.",
  },
  Increasing: {
    label: "En augmentation",
    text: "Le nombre d'individus augmente, souvent grâce aux efforts de protection.",
  },
  Stable: {
    label: "Stable",
    text: "Le nombre d'individus ne varie pas de façon notable.",
  },
  Unknown: {
    label: "Tendance inconnue",
    text: "Les données manquent pour savoir si la population augmente ou diminue.",
  },
};

const numberFr = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 });

export { TRENDS, numberFr };
