import type { PresenceKind } from "@app/contracts";

const PRESENCE_FILLS: Record<PresenceKind, string> = {
  current: "var(--color-status-cr)",
  uncertain: "var(--color-status-cr-border)",
  extinct: "var(--color-ink-faint)",
};

const EYEBROW =
  "mb-2 font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-faint)]";

export { EYEBROW, PRESENCE_FILLS };
