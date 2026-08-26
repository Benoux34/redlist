import { Checkbox } from "@/components/ui/checkbox";
import { CATEGORY_PILLS } from "./utils";

type Props = Readonly<{
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  withPhoto: boolean;
  onWithPhotoChange: (withPhoto: boolean) => void;
  totalItems: number | undefined;
  isLoading: boolean;
}>;

const SpeciesFilters = ({
  selectedCategory,
  onCategoryChange,
  withPhoto,
  onWithPhotoChange,
  totalItems,
  isLoading,
}: Props) => {
  return (
    <section className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[var(--color-paper-border)] pb-4">
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
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border transition-colors cursor-pointer rounded-none ${
                isSelected
                  ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)]"
                  : "border-[var(--color-paper-border)] bg-[var(--color-paper-card)] text-[var(--color-ink-muted)] hover:border-[var(--color-paper-border-strong)] hover:text-[var(--color-ink)]"
              }`}
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
    </section>
  );
};

export { SpeciesFilters };
