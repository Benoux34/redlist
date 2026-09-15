import { useState, type ReactNode } from "react";
import type { GroupCountsQuery } from "@app/contracts";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { collapsibleClass } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { SpeciesGroupFilter } from "./SpeciesGroupFilter";
import { CATEGORY_PILLS, PILL_CLASS, PILL_IDLE, PILL_SELECTED } from "./utils";

type Props = Readonly<{
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  selectedGroup?: string | null;
  onGroupChange?: (group: string | null) => void;
  scope?: GroupCountsQuery | undefined;
  withPhoto: boolean;
  onWithPhotoChange: (withPhoto: boolean) => void;
  totalItems: number | undefined;
  isLoading: boolean;
  actions?: ReactNode;
}>;

const SpeciesFilters = ({
  selectedCategory,
  onCategoryChange,
  selectedGroup,
  onGroupChange,
  scope,
  withPhoto,
  onWithPhotoChange,
  totalItems,
  isLoading,
  actions,
}: Props) => {
  const activeCount = [
    selectedCategory !== null,
    selectedGroup !== null && selectedGroup !== undefined,
    withPhoto,
  ].filter(Boolean).length;

  const [isOpen, setIsOpen] = useState<boolean>(activeCount > 0);

  return (
    <section className="mb-8 border-b border-[var(--color-paper-border)] pb-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="species-filters"
            className={`${PILL_CLASS} ${activeCount > 0 ? PILL_SELECTED : PILL_IDLE}`}
          >
            <SlidersHorizontal className="size-3.5" aria-hidden="true" />
            <span>Filtres</span>
            {activeCount > 0 && (
              <span className="inline-flex size-4 items-center justify-center bg-[var(--color-status-cr)] font-mono text-[10px] leading-none text-white">
                {activeCount}
              </span>
            )}
            <ChevronDown
              className={`size-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>

          {actions}
        </div>

        <div className="font-mono text-xs text-[var(--color-ink-muted)]">
          {isLoading ? (
            <span className="inline-block h-4 w-12 animate-pulse bg-[var(--color-paper-muted)]" />
          ) : totalItems !== undefined ? (
            <span>
              {new Intl.NumberFormat("fr-FR").format(totalItems)}{" "}
              {totalItems <= 1 ? "espèce" : "espèces"}
            </span>
          ) : null}
        </div>
      </div>

      <div
        id="species-filters"
        inert={!isOpen}
        className={collapsibleClass(isOpen)}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="space-y-4 pt-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="mr-1 hidden text-xs text-[var(--color-ink-faint)] sm:inline">
                  Paliers :
                </span>
                {CATEGORY_PILLS.map((cat) => {
                  const isSelected = selectedCategory === cat.code;

                  return (
                    <button
                      key={cat.code ?? "ALL"}
                      type="button"
                      onClick={() => onCategoryChange(cat.code)}
                      aria-pressed={isSelected}
                      className={`${PILL_CLASS} ${isSelected ? PILL_SELECTED : PILL_IDLE}`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${cat.dot} ${
                          isSelected ? "ring-2 ring-current/20" : ""
                        }`}
                        aria-hidden="true"
                      />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              <label className="inline-flex cursor-pointer select-none items-center gap-2 text-xs font-medium text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)]">
                <Checkbox
                  checked={withPhoto}
                  onCheckedChange={(checked) =>
                    onWithPhotoChange(Boolean(checked))
                  }
                />
                <span>Avec photo uniquement</span>
              </label>
            </div>

            {onGroupChange !== undefined && (
              <SpeciesGroupFilter
                selectedGroup={selectedGroup ?? null}
                onGroupChange={onGroupChange}
                scope={scope}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export { SpeciesFilters };
