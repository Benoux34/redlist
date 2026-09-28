const LABEL_CLASS =
  "mb-2 block text-xs font-medium uppercase tracking-wider text-[var(--color-ink-muted)]";

const ERROR_CLASS = "mt-1.5 text-xs text-[var(--color-status-cr)]";

const ERROR_MESSAGES: Record<string, string> = {
  RATE_LIMITED: "Trop de demandes. Réessaie dans une heure.",
};

export { ERROR_CLASS, ERROR_MESSAGES, LABEL_CLASS };
