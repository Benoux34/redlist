import { useEffect, useState } from "react";
import { SearchShell } from "@/components/search-shell/SearchShell";
import { useDebounce } from "@/hooks/use-debounce/useDebounce";

type Props = Readonly<{
  searchValue: string;
  onSearchChange?: (search: string) => void;
}>;

const FranceHero = ({ searchValue, onSearchChange }: Props) => {
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
          Les espèces menacées{" "}
          <span className="italic font-normal underline decoration-[var(--color-paper-border-strong)] decoration-2 underline-offset-8">
            en France
          </span>
          .
        </h1>

        <p className="text-base sm:text-xl leading-relaxed text-[var(--color-ink-muted)] mb-10 max-w-5xl">
          L&apos;ensemble des espèces recensées sur le territoire français
          faisant l&apos;objet d&apos;un classement de risque d&apos;extinction
          dans la base internationale de l&apos;UICN.
        </p>

        <SearchShell
          value={draft}
          onChange={setDraft}
          onClear={clear}
          placeholder="Rechercher une espèce en France (ex : lynx, ours, chouette)…"
        />
      </div>
    </section>
  );
};

export { FranceHero };
