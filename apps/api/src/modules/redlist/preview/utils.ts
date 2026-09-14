const CATEGORY_LABELS: Record<string, string> = {
  EX: "Éteinte",
  EW: "Éteinte à l'état sauvage",
  CR: "En danger critique d'extinction",
  EN: "En danger d'extinction",
  VU: "Vulnérable",
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function truncate(text: string, max: number): string {
  const collapsed = text.replace(/\s+/g, " ").trim();
  if (collapsed.length <= max) return collapsed;

  const cut = collapsed.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");

  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

function categoryLabel(code: string): string {
  return CATEGORY_LABELS[code] ?? code;
}

export { CATEGORY_LABELS, categoryLabel, escapeHtml, truncate };
