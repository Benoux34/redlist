import { useEffect, useState, type ChangeEvent } from "react";
import { Search, X } from "lucide-react";
import type { RedListFilters } from "@/api/red-list/entities";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useDebounce } from "@/hooks/use-debounce/useDebounce";

type Props = Readonly<{
  filters: RedListFilters;
  onSearchChange: (search: string) => void;
  onWithPhotoChange: (withPhoto: boolean) => void;
  totalItems: number | undefined;
  isLoading: boolean;
}>;

const Controls = ({
  filters,
  onSearchChange,
  onWithPhotoChange,
  totalItems,
  isLoading,
}: Props) => {
  const [searchValue, setSearchValue] = useState<string>(filters.search ?? "");
  const debouncedSearch = useDebounce(searchValue, 300);

  useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue("");
  };

  return (
    <section className="mb-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[var(--color-ink-faint)]" />
        <Input
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          placeholder="Rechercher par nom scientifique ou français..."
          className="pl-10 pr-24"
        />

        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
          {searchValue.length > 0 && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] transition-colors cursor-pointer p-0.5"
              title="Effacer la recherche"
            >
              <X className="size-4" />
            </button>
          )}

          <div className="text-xs text-[var(--color-ink-muted)]">
            {isLoading ? (
              <span className="inline-block h-4 w-12 animate-pulse bg-[var(--color-paper-muted)]" />
            ) : totalItems !== undefined ? (
              <span className="tabular-nums">
                {new Intl.NumberFormat("fr-FR").format(totalItems)}{" "}
                {totalItems <= 1 ? "espèce" : "espèces"}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <label className="inline-flex items-center gap-2 text-xs font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] cursor-pointer select-none transition-colors shrink-0 py-1 sm:py-0">
        <Checkbox
          checked={filters.withPhoto}
          onCheckedChange={(checked) => onWithPhotoChange(Boolean(checked))}
        />
        <span>Avec photographie uniquement</span>
      </label>
    </section>
  );
};

export { Controls };
