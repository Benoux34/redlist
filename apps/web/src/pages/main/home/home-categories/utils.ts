import type { CategoryGuideItem } from "./entities";

const CATEGORY_GUIDE: CategoryGuideItem[] = [
  {
    code: "EX",
    labelFr: "Éteint",
    criterionSummary: "Disparition totale et irréversible",
    description:
      "Aucun doute subsistant sur la mort du dernier individu après des prospections exhaustives dans son aire historique.",
    badgeBg: "bg-[var(--color-paper-muted)]",
    badgeText: "text-[var(--color-ink)]",
    badgeBorder: "border-[var(--color-paper-border-strong)]",
    dot: "bg-[var(--color-ink)]",
  },
  {
    code: "EW",
    labelFr: "Éteint à l'état sauvage",
    criterionSummary: "Survie artificielle uniquement",
    description:
      "Disparue de son milieu naturel. Ne subsiste que maintenue vivante en captivité, parcs zoologiques ou jardins botaniques.",
    badgeBg: "bg-[var(--color-status-ew-bg)]",
    badgeText: "text-[var(--color-status-ew)]",
    badgeBorder: "border-[var(--color-status-ew-border)]",
    dot: "bg-[var(--color-status-ew)]",
  },
  {
    code: "CR",
    labelFr: "En danger critique",
    criterionSummary: "Risque d'extinction imminent",
    description:
      "Populations en déclin extrême (> 80 % en 10 ans) ou aires de répartition réduites à des isolats critiques.",
    badgeBg: "bg-[var(--color-status-cr-bg)]",
    badgeText: "text-[var(--color-status-cr)]",
    badgeBorder: "border-[var(--color-status-cr-border)]",
    dot: "bg-[var(--color-status-cr)]",
  },
  {
    code: "EN",
    labelFr: "En danger",
    criterionSummary: "Risque très élevé à court terme",
    description:
      "Déclin continu des effectifs et fragmentation sévère des habitats indispensables à la survie de l'espèce.",
    badgeBg: "bg-[var(--color-status-en-bg)]",
    badgeText: "text-[var(--color-status-en)]",
    badgeBorder: "border-[var(--color-status-en-border)]",
    dot: "bg-[var(--color-status-en)]",
  },
  {
    code: "VU",
    labelFr: "Vulnérable",
    criterionSummary: "Risque élevé à moyen terme",
    description:
      "Espèces sous forte pression (dégradation des milieux, surexploitation, changement climatique) en régression rapide.",
    badgeBg: "bg-[var(--color-status-vu-bg)]",
    badgeText: "text-[var(--color-status-vu)]",
    badgeBorder: "border-[var(--color-status-vu-border)]",
    dot: "bg-[var(--color-status-vu)]",
  },
];

export { CATEGORY_GUIDE };
