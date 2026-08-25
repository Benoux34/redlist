import { Search, X } from "lucide-react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { Input } from "@/components/ui/input";

type Props = Readonly<{
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onSubmit?: ((event: FormEvent) => void) | undefined;
  action?: ReactNode;
}>;

const SearchShell = ({ value, onChange, onClear, onSubmit, action }: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit?.(event);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-stretch gap-2 border border-[var(--color-paper-border-strong)] bg-[var(--color-paper-card)] p-2 shadow-xs sm:flex-row"
    >
      <div className="relative flex flex-1 items-center">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-3 size-4 text-[var(--color-ink-muted)]"
        />

        <label className="sr-only">Rechercher une espèce</label>

        <Input
          type="text"
          value={value}
          onChange={handleChange}
          maxLength={80}
          autoComplete="off"
          placeholder="Rechercher une espèce (ex : lynx, panthera, baobab)…"
          className="h-11 border-none bg-transparent pl-9 pr-8 text-sm shadow-none placeholder:text-[var(--color-ink-faint)] focus-visible:ring-0 sm:text-base"
        />

        {value.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Effacer la recherche"
            className="absolute right-2.5 cursor-pointer p-1 text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)]"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        )}
      </div>

      {action}
    </form>
  );
};

export { SearchShell };
