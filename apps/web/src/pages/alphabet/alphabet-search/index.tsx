import { SearchShell } from "@/components/search-shell/SearchShell";
import { useDebounce } from "@/hooks/use-debounce/useDebounce";
import { useEffect, useState } from "react";

type Props = Readonly<{
  letter: string;
  searchValue: string;
  onSearchChange?: (search: string) => void;
}>;

const AlphabetSearch = ({ letter, searchValue, onSearchChange }: Props) => {
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
    <div className="mb-4">
      <SearchShell
        value={draft}
        onChange={setDraft}
        onClear={clear}
        placeholder={`Rechercher une espèce commençant par la lettre "${letter}"`}
      />
    </div>
  );
};

export { AlphabetSearch };
