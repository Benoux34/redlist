import type { CountryCategoryCounts } from "@app/contracts";

const CATEGORY_ROWS = [
  { code: "CR", label: "En danger critique", color: "#a52a24" },
  { code: "EN", label: "En danger", color: "#9a5500" },
  { code: "VU", label: "Vulnérable", color: "#946e00" },
] as const;

const CHOROPLETH_STEPS = [
  { min: 2500, color: "#a52a24" },
  { min: 1200, color: "#cc675c" },
  { min: 600, color: "#e79a8f" },
  { min: 250, color: "#f6c3bb" },
  { min: 1, color: "#fce1dd" },
] as const;

const NO_DATA_COLOR = "#e0dace";

function choroplethColor(total: number | null): string {
  if (total === null) return NO_DATA_COLOR;

  return (
    CHOROPLETH_STEPS.find((step) => total >= step.min)?.color ?? NO_DATA_COLOR
  );
}

function barWidth(value: number, counts: CountryCategoryCounts): string {
  const max = Math.max(counts.CR, counts.EN, counts.VU, 1);

  return `${Math.max(2, Math.round((value / max) * 100))}%`;
}

const numberFr = new Intl.NumberFormat("fr-FR");

function initialsOf(scientificName: string): string {
  const parts = scientificName.trim().split(/\s+/);

  return parts.length >= 2
    ? `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase()
    : (parts[0]?.[0] ?? "—").toUpperCase();
}

export {
  CATEGORY_ROWS,
  CHOROPLETH_STEPS,
  NO_DATA_COLOR,
  barWidth,
  choroplethColor,
  initialsOf,
  numberFr,
};
