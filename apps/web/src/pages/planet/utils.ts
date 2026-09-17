import type { RedListCountryCount } from "@app/contracts";
import type {
  CountryValues,
  MapFilters,
  MapStatus,
  ScaleStep,
} from "./entities";

const SCALE_COLORS = [
  "#fce1dd",
  "#f6c3bb",
  "#e79a8f",
  "#cc675c",
  "#a52a24",
] as const;

const SCALE_QUANTILES = [0.2, 0.4, 0.6, 0.8] as const;

const NO_DATA_COLOR = "var(--color-paper-card)";

const numberFr = new Intl.NumberFormat("fr-FR");

function buildCountryValues(
  counts: readonly RedListCountryCount[],
  status: MapStatus,
): CountryValues {
  return new Map(
    counts.map((entry) => [
      entry.countryCode.toUpperCase(),
      status === "threatened" ? entry.threatened : entry.counts[status],
    ]),
  );
}

function roundNicely(value: number): number {
  const precision = 10 ** Math.max(0, Math.floor(Math.log10(value)) - 1);

  return Math.max(1, Math.round(value / precision) * precision);
}

function buildScale(values: Iterable<number>): ScaleStep[] {
  const sorted = [...values].filter((value) => value > 0).sort((a, b) => a - b);
  if (sorted.length === 0) return [];

  const mins = [1];

  for (const quantile of SCALE_QUANTILES) {
    const value = sorted[Math.floor(quantile * (sorted.length - 1))] ?? 1;
    const min = roundNicely(value);

    if (min > (mins[mins.length - 1] ?? 0)) mins.push(min);
  }

  const colors = SCALE_COLORS.slice(SCALE_COLORS.length - mins.length);

  return mins.map((min, i) => ({ min, color: colors[i] ?? NO_DATA_COLOR }));
}

function scaleColor(
  scale: readonly ScaleStep[],
  value: number | undefined,
): string {
  if (value === undefined || value <= 0) return NO_DATA_COLOR;

  return scale.findLast((step) => value >= step.min)?.color ?? NO_DATA_COLOR;
}

function countrySearch(filters: MapFilters): string {
  const params = new URLSearchParams();

  if (filters.status !== "threatened") params.set("category", filters.status);
  if (filters.group !== null) params.set("group", filters.group);

  const query = params.toString();

  return query === "" ? "" : `?${query}`;
}

export {
  NO_DATA_COLOR,
  countrySearch,
  buildCountryValues,
  buildScale,
  numberFr,
  scaleColor,
};
