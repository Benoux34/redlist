import { Checkbox } from "@/components/ui/checkbox";
import { SpeciesGroupFilter } from "./SpeciesGroupFilter";
import { CATEGORY_PILLS, PILL_CLASS, PILL_IDLE, PILL_SELECTED } from "./utils";

type Props = Readonly<{
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  selectedGroup?: string | null;
  onGroupChange?: (group: string | null) => void;
  withPhoto: boolean;
  onWithPhotoChange: (withPhoto: boolean) => void;
  totalItems: number | undefined;
  isLoading: boolean;
}>;

const SpeciesFilters = ({
  selectedCategory,
  onCategoryChange,
  selectedGroup,
  onGroupChange,
  withPhoto,
  onWithPhotoChange,
  totalItems,
  isLoading,
}: Props) => {
  return (
    <section className="mb-8 space-y-4 border-b border-[var(--color-paper-border)] pb-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-[var(--color-ink-faint)] mr-1 hidden sm:inline">
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

        <div className="flex items-center gap-4 justify-between sm:justify-end">
          <label className="inline-flex items-center gap-2 text-xs font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] cursor-pointer select-none transition-colors">
            <Checkbox
              checked={withPhoto}
              onCheckedChange={(checked) => onWithPhotoChange(Boolean(checked))}
            />
            <span>Avec photo uniquement</span>
          </label>

          <div className="text-xs text-[var(--color-ink-muted)] font-mono">
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
      </div>

      {onGroupChange !== undefined && (
        <SpeciesGroupFilter
          selectedGroup={selectedGroup ?? null}
          onGroupChange={onGroupChange}
        />
      )}
    </section>
  );
};

export { SpeciesFilters };
