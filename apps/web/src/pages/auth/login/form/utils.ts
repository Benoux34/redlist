const ERROR_MESSAGES: Record<string, string> = {
  INVALID_CREDENTIALS: "Adresse électronique ou mot de passe incorrect.",
  RATE_LIMITED: "Trop de tentatives. Réessaie dans quelques minutes.",
};

const LABEL_CLASS =
  "block text-xs font-medium uppercase tracking-wider text-[var(--color-ink-muted)]";

function redirectTarget(state: unknown): string {
  if (
    typeof state === "object" &&
    state !== null &&
    "from" in state &&
    typeof (state as { from: unknown }).from === "object"
  ) {
    const from = (state as { from: { pathname?: unknown; search?: unknown } })
      .from;
    if (typeof from.pathname !== "string") return "/account";

    return typeof from.search === "string"
      ? `${from.pathname}${from.search}`
      : from.pathname;
  }

  return "/account";
}

export { ERROR_MESSAGES, LABEL_CLASS, redirectTarget };
