const category_colors: Record<
  string,
  { label: string; text: string; dot: string; bg: string; border: string }
> = {
  EX: {
    label: "Éteint",
    text: "text-[var(--color-ink)]",
    dot: "bg-[var(--color-ink)]",
    bg: "bg-[var(--color-paper-muted)]",
    border: "border-[var(--color-paper-border-strong)]",
  },
  EW: {
    label: "Éteint à l'état sauvage",
    text: "text-[var(--color-status-ew)]",
    dot: "bg-[var(--color-status-ew)]",
    bg: "bg-[var(--color-status-ew-bg)]",
    border: "border-[var(--color-status-ew-border)]",
  },
  CR: {
    label: "En danger critique",
    text: "text-[var(--color-status-cr)]",
    dot: "bg-[var(--color-status-cr)]",
    bg: "bg-[var(--color-status-cr-bg)]",
    border: "border-[var(--color-status-cr-border)]",
  },
  EN: {
    label: "En danger",
    text: "text-[var(--color-status-en)]",
    dot: "bg-[var(--color-status-en)]",
    bg: "bg-[var(--color-status-en-bg)]",
    border: "border-[var(--color-status-en-border)]",
  },
  VU: {
    label: "Vulnérable",
    text: "text-[var(--color-status-vu)]",
    dot: "bg-[var(--color-status-vu)]",
    bg: "bg-[var(--color-status-vu-bg)]",
    border: "border-[var(--color-status-vu-border)]",
  },
};

const POPULATION_TREND_FR: Record<string, string> = {
  Decreasing: "En déclin",
  Increasing: "En augmentation",
  Stable: "Stable",
  Unknown: "Tendance inconnue",
};

const SYSTEM_FR: Record<string, string> = {
  Terrestrial: "Terrestre",
  "Freshwater (=Inland waters)": "Eau douce",
  Marine: "Marin",
};

const getTrendLabel = (trend: string | null): string => {
  if (!trend) return "Tendance inconnue";
  return POPULATION_TREND_FR[trend] ?? trend;
};

const translateSystem = (system: string): string => {
  return SYSTEM_FR[system] ?? system;
};

const getInitials = (scientificName: string): string => {
  const parts = scientificName.trim().split(/\s+/);
  if (parts.length >= 2)
    return `${parts[0]?.[0] ?? ""}. ${parts[1]?.[0] ?? ""}.`;

  return parts[0]?.[0] ?? "—";
};

export { category_colors, getTrendLabel, translateSystem, getInitials };
