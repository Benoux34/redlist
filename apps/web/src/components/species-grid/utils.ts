const category_colors: Record<
  string,
  { label: string; text: string; dot: string }
> = {
  EX: {
    label: "Éteint",
    text: "text-[var(--color-ink)]",
    dot: "bg-[var(--color-ink)]",
  },
  EW: {
    label: "Éteint à l'état sauvage",
    text: "text-[var(--color-status-ew)]",
    dot: "bg-[var(--color-status-ew)]",
  },
  CR: {
    label: "En danger critique",
    text: "text-[var(--color-status-cr)]",
    dot: "bg-[var(--color-status-cr)]",
  },
  EN: {
    label: "En danger",
    text: "text-[var(--color-status-en)]",
    dot: "bg-[var(--color-status-en)]",
  },
};

const getInitials = (scientificName: string): string => {
  const parts = scientificName.trim().split(/\s+/);
  if (parts.length >= 2)
    return `${parts[0]?.[0] ?? ""}. ${parts[1]?.[0] ?? ""}.`;

  return parts[0]?.[0] ?? "—";
};

export { getInitials, category_colors };
