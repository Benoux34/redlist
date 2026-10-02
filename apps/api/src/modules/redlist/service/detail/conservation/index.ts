import type { ConservationGroup, ConservationMeasure } from "@app/contracts";
import type { RawConservationGroup } from "../entities";
import {
  GROUP_ORDER,
  GROUP_TITLES,
  MEASURE_LABELS,
  PROTECTED_SHARE,
  STATUS_RANK,
} from "./utils";

function parseMeasure(
  name: string,
  value: string | null | undefined,
): ConservationMeasure | null {
  const label = MEASURE_LABELS[name] ?? name;

  if (name === PROTECTED_SHARE && value !== null && value !== undefined)
    return value === "0"
      ? { label, status: "no", detail: "Aucune" }
      : value === "Unknown"
        ? null
        : {
            label,
            status: value === "100" || value === "91-100" ? "yes" : "partial",
            detail: `${value.replace("-", " à ")} %`,
          };

  switch (value) {
    case "Yes":
      return { label, status: "yes", detail: null };
    case "Yes, over entire range":
      return { label, status: "yes", detail: "Sur toute son aire" };
    case "Yes, over part of range":
      return { label, status: "partial", detail: "Sur une partie de son aire" };
    case "No":
      return { label, status: "no", detail: null };
    default:
      return null;
  }
}

function buildConservation(
  groups: readonly RawConservationGroup[],
): ConservationGroup[] {
  return groups
    .map((group) => ({
      title: GROUP_TITLES[group.name] ?? group.name,
      measures: group.actions
        .flatMap((action) => parseMeasure(action.name, action.value) ?? [])
        .sort((a, b) => STATUS_RANK[a.status] - STATUS_RANK[b.status]),
    }))
    .filter((group) => group.measures.length > 0)
    .sort(
      (a, b) => GROUP_ORDER.indexOf(a.title) - GROUP_ORDER.indexOf(b.title),
    );
}

export { buildConservation, parseMeasure };
