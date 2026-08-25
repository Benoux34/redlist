import { useEffect, useState } from "react";
import { SearchShell } from "./search-shell/SearchShell";
import { useDebounce } from "@/hooks/useDebounce";

type Props = Readonly<{
  searchValue: string;
  onSearchChange?: (search: string) => void;
}>;

const ThreatenedSpeciesHero = ({ searchValue, onSearchChange }: Props) => {
  const [draft, setDraft] = useState<string>(searchValue ?? "");
  const debounced = useDebounce(draft, 300);

  useEffect(() => {
    if (debounced === searchValue) return;

    onSearchChange?.(debounced);
  }, [debounced, searchValue, onSearchChange]);

  const clear = () => {
    setDraft("");
    onSearchChange?.("");
  };

  return (
    <section className="mt-8 mb-4 text-left">
      <div className="w-full text-left">
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[var(--color-ink)] leading-[1.08] mb-6">
          L&apos;inventaire vivant de{" "}
          <span className="italic font-normal underline decoration-[var(--color-paper-border-strong)] decoration-2 underline-offset-8">
            50 167 espèces
          </span>{" "}
          au bord de l&apos;extinction.
        </h1>

        <p className="text-base sm:text-xl leading-relaxed text-[var(--color-ink-muted)] mb-10 max-w-5xl">
          Du grand mammifère emblématique aux mollusques et flores discrets,
          REDLIST documente chaque palier de menace sans artifice ni
          sensationnalisme.
        </p>

        <SearchShell value={draft} onChange={setDraft} onClear={clear} />
      </div>
    </section>
  );
};

export { ThreatenedSpeciesHero };
