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

const PILL_CLASS =
  "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border transition-colors cursor-pointer rounded-none";

const PILL_SELECTED =
  "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)]";

const PILL_IDLE =
  "border-[var(--color-paper-border)] bg-[var(--color-paper-card)] text-[var(--color-ink-muted)] hover:border-[var(--color-paper-border-strong)] hover:text-[var(--color-ink)]";

export { CATEGORY_PILLS, PILL_CLASS, PILL_SELECTED, PILL_IDLE };
