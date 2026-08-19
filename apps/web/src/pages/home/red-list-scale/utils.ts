import type { CategoryMeta } from "./entities";

const redlist_categories: CategoryMeta[] = [
  {
    code: "EX",
    numeral: "I",
    title: "Éteint",
    shortDescription:
      "Aucun individu vivant connu n'a été observé. L'espèce a totalement disparu.",
    accentClass: "text-[var(--color-ink)]",
    selectedBgClass: "bg-[var(--color-paper-muted)]",
    dotColorClass: "bg-[var(--color-ink)]",
  },
  {
    code: "EW",
    numeral: "II",
    title: "Éteint à l'état sauvage",
    shortDescription:
      "Survit uniquement en captivité ou en culture contrôlée (parcs, zoos, serres).",
    accentClass: "text-[var(--color-status-ew)]",
    selectedBgClass: "bg-[var(--color-status-ew-bg)]/70",
    dotColorClass: "bg-[var(--color-status-ew)]",
  },
  {
    code: "CR",
    numeral: "III",
    title: "En danger critique",
    shortDescription:
      "Confronté à un risque d'extinction extrêmement élevé dans la nature.",
    accentClass: "text-[var(--color-status-cr)]",
    selectedBgClass: "bg-[var(--color-status-cr-bg)]/70",
    dotColorClass: "bg-[var(--color-status-cr)]",
  },
  {
    code: "EN",
    numeral: "IV",
    title: "En danger",
    shortDescription:
      "Confronté à un risque très élevé d'extinction dans son milieu naturel.",
    accentClass: "text-[var(--color-status-en)]",
    selectedBgClass: "bg-[var(--color-status-en-bg)]/70",
    dotColorClass: "bg-[var(--color-status-en)]",
  },
  {
    code: null,
    numeral: "V",
    title: "Toutes les espèces",
    shortDescription:
      "Explorer l'ensemble des espèces recensées sans filtrer par niveau de menace.",
    accentClass: "text-[var(--color-ink)]",
    selectedBgClass: "bg-[var(--color-paper-muted)]",
    dotColorClass: "bg-[var(--color-ink-muted)]",
  },
];

const formatCount = (count: number | undefined): string => {
  if (count === undefined) return "—";
  return new Intl.NumberFormat("fr-FR").format(count);
};

export { redlist_categories, formatCount };
