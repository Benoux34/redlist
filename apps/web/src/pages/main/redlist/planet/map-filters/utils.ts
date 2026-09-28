import type { SpeciesGroup } from "@app/contracts";
import { group_labels } from "@/components/species-grid/utils";
import type { MapFilters, MapStatus } from "../entities";

const STATUS_OPTIONS: readonly Readonly<{
  value: MapStatus;
  label: string;
  dot: string;
}>[] = [
  {
    value: "threatened",
    label: "Total (CR, EN et VU)",
    dot: "bg-[var(--color-status-cr)]",
  },
  { value: "CR", label: "CR • Critique", dot: "bg-[var(--color-status-cr)]" },
  { value: "EN", label: "EN • En danger", dot: "bg-[var(--color-status-en)]" },
  {
    value: "VU",
    label: "VU • Vulnérable",
    dot: "bg-[var(--color-status-vu)]",
  },
  {
    value: "EW",
    label: "EW • En captivité",
    dot: "bg-[var(--color-status-ew)]",
  },
  { value: "EX", label: "EX • Éteint", dot: "bg-[var(--color-ink)]" },
];

const GROUP_OPTIONS: readonly SpeciesGroup[] = [
  "mammiferes",
  "oiseaux",
  "reptiles",
  "amphibiens",
  "poissons",
  "insectes",
  "mollusques",
  "plantes",
];

function filterQualifier(filters: MapFilters): string {
  return [
    filters.group === null ? null : group_labels[filters.group],
    filters.status === "threatened" ? "Total (CR, EN et VU)" : filters.status,
  ]
    .filter(Boolean)
    .join(" · ");
}

export { GROUP_OPTIONS, STATUS_OPTIONS, filterQualifier };
