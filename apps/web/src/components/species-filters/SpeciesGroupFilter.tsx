import type { GroupCount, GroupCountsQuery } from "@app/contracts";
import { useCallback } from "react";
import { groupCountsRequest } from "@/api/red-list";
import { useAsyncData } from "@/hooks/use-async-data/useAsyncData";
import { group_labels } from "@/components/species-grid/utils";
import { PILL_CLASS, PILL_IDLE, PILL_SELECTED } from "./utils";

type Props = Readonly<{
  selectedGroup: string | null;
  onGroupChange: (group: string | null) => void;
  // Restricts the counts to the filters the page locks down, so the pills match
  // the listing below them. Must be referentially stable — a module constant or
  // a memo — like the locked filters handed to useRedList.
  scope?: GroupCountsQuery | undefined;
}>;

const SpeciesGroupFilter = ({ selectedGroup, onGroupChange, scope }: Props) => {
  const loadGroups = useCallback(() => groupCountsRequest(scope), [scope]);
  const groups = useAsyncData(loadGroups, [scope]);

  if (groups.status !== "success" || groups.data.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="mr-1 hidden text-xs text-[var(--color-ink-faint)] sm:inline">
        Groupes :
      </span>

      <button
        type="button"
        onClick={() => onGroupChange(null)}
        aria-pressed={selectedGroup === null}
        className={`${PILL_CLASS} ${selectedGroup === null ? PILL_SELECTED : PILL_IDLE}`}
      >
        Tous
      </button>

      {groups.data.map((entry: GroupCount) => {
        const isSelected = selectedGroup === entry.group;

        return (
          <button
            key={entry.group}
            type="button"
            onClick={() => onGroupChange(isSelected ? null : entry.group)}
            aria-pressed={isSelected}
            className={`${PILL_CLASS} ${isSelected ? PILL_SELECTED : PILL_IDLE}`}
          >
            <span>{group_labels[entry.group]}</span>
            <span className="tabular-nums opacity-60">
              {new Intl.NumberFormat("fr-FR").format(entry.count)}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export { SpeciesGroupFilter };
