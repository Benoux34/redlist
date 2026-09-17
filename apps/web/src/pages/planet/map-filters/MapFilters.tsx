import type { SpeciesGroup } from "@app/contracts";
import { group_labels } from "@/components/species-grid/utils";
import {
  PILL_CLASS,
  PILL_IDLE,
  PILL_SELECTED,
} from "@/components/species-filters/utils";
import type { MapFilters as Filters, MapStatus } from "../entities";
import { GROUP_OPTIONS, STATUS_OPTIONS } from "./utils";

type Props = Readonly<{
  filters: Filters;
  onStatusChange: (status: MapStatus) => void;
  onGroupChange: (group: SpeciesGroup | null) => void;
}>;

const ROW_LABEL =
  "w-16 shrink-0 font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-faint)]";

const pill = (selected: boolean) =>
  `${PILL_CLASS} ${selected ? PILL_SELECTED : PILL_IDLE}`;

const MapFilters = ({ filters, onStatusChange, onGroupChange }: Props) => (
  <div className="flex flex-col gap-3">
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <span className={ROW_LABEL}>Statut</span>
      <div className="flex flex-wrap gap-1.5">
        {STATUS_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onStatusChange(option.value)}
            aria-pressed={filters.status === option.value}
            className={pill(filters.status === option.value)}
          >
            <span
              className={`size-1.5 rounded-full ${option.dot}`}
              aria-hidden="true"
            />
            {option.label}
          </button>
        ))}
      </div>
    </div>

    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <span className={ROW_LABEL}>Groupe</span>
      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => onGroupChange(null)}
          aria-pressed={filters.group === null}
          className={pill(filters.group === null)}
        >
          Tous
        </button>
        {GROUP_OPTIONS.map((group) => (
          <button
            key={group}
            type="button"
            onClick={() =>
              onGroupChange(filters.group === group ? null : group)
            }
            aria-pressed={filters.group === group}
            className={pill(filters.group === group)}
          >
            {group_labels[group]}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export { MapFilters };
