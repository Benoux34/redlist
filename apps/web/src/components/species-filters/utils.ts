const CATEGORY_PILLS = [
  { code: null, label: "Toutes", dot: "bg-[var(--color-ink-muted)]" },
  {
    code: "EX",
    label: "EX • Éteint",
    dot: "bg-[var(--color-ink)]",
  },
  {
    code: "EW",
    label: "EW • En captivité",
    dot: "bg-[var(--color-status-ew)]",
  },
  {
    code: "CR",
    label: "CR • Critique",
    dot: "bg-[var(--color-status-cr)]",
  },
  {
    code: "EN",
    label: "EN • En danger",
    dot: "bg-[var(--color-status-en)]",
  },
  {
    code: "VU",
    label: "VU • Vulnérable",
    dot: "bg-[var(--color-status-vu)]",
  },
] as const;

export { CATEGORY_PILLS };
