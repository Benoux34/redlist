import type { MeasureStatus } from "@app/contracts";
import { Check, CircleDashed, X, type LucideIcon } from "lucide-react";

const STATUS_STYLES: Record<
  MeasureStatus,
  { icon: LucideIcon; box: string; text: string; label: string }
> = {
  yes: {
    icon: Check,
    box: "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)]",
    text: "text-[var(--color-ink)]",
    label: "En place",
  },
  partial: {
    icon: CircleDashed,
    box: "border-[var(--color-ink-muted)] bg-[var(--color-paper-card)] text-[var(--color-ink)]",
    text: "text-[var(--color-ink)]",
    label: "En partie",
  },
  no: {
    icon: X,
    box: "border-[var(--color-paper-border)] bg-transparent text-[var(--color-ink-faint)]",
    text: "text-[var(--color-ink-muted)]",
    label: "Pas encore",
  },
};

export { STATUS_STYLES };
