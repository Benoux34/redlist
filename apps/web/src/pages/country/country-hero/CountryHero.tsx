import { useEffect, useState } from "react";
import { SearchShell } from "@/components/search-shell/SearchShell";
import { useDebounce } from "@/hooks/use-debounce/useDebounce";

type Props = Readonly<{
  countryName: string;
  searchValue: string;
  onSearchChange?: (search: string) => void;
}>;

const CountryHero = ({ countryName, searchValue, onSearchChange }: Props) => {
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
      <h1 className="mb-6 font-serif text-4xl leading-[1.08] tracking-tight text-[var(--color-ink)] sm:text-6xl lg:text-7xl">
        Les espèces menacées —{" "}
        <span className="italic font-normal underline decoration-[var(--color-paper-border-strong)] decoration-2 underline-offset-8">
          {countryName}
        </span>
        .
      </h1>

      <p className="mb-10 max-w-5xl text-base leading-relaxed text-[var(--color-ink-muted)] sm:text-xl">
        L&apos;ensemble des espèces recensées sur ce territoire faisant
        l&apos;objet d&apos;un classement de risque d&apos;extinction dans la
        base internationale de l&apos;UICN.
      </p>

      <SearchShell
        value={draft}
        onChange={setDraft}
        onClear={clear}
        placeholder={`Rechercher une espèce — ${countryName}…`}
      />
    </section>
  );
};

export { CountryHero };
