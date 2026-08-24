import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";
import type { RedListFilters } from "@/api/red-list/entities";

const VALID_CATEGORIES = new Set(["EX", "EW", "CR", "EN", "VU"]);

function useRedListFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo<RedListFilters>(() => {
    const rawCategory = searchParams.get("category");
    const rawPage = Number(searchParams.get("page"));
    const rawSearch = searchParams.get("search");
    const rawLetter = searchParams.get("letter");
    const rawPossiblyExtinct = searchParams.get("possiblyExtinct") === "true";
    const rawCountryCode = searchParams.get("countryCode");

    return {
      category:
        rawCategory !== null && VALID_CATEGORIES.has(rawCategory)
          ? rawCategory
          : null,
      search: rawSearch !== null && rawSearch.length >= 2 ? rawSearch : null,
      withPhoto: searchParams.get("withPhoto") === "true",
      possiblyExtinct: rawPossiblyExtinct,
      letter: rawLetter !== null && rawLetter.length === 1 ? rawLetter : null,
      countryCode: rawCountryCode !== null ? rawCountryCode : null,
      page: Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1,
    };
  }, [searchParams]);

  const setCategory = useCallback(
    (category: string | null) => {
      setSearchParams((previous) => {
        const next = new URLSearchParams(previous);

        if (category === null) next.delete("category");
        else next.set("category", category);

        next.delete("page");
        return next;
      });
    },
    [setSearchParams],
  );

  const setSearch = useCallback(
    (search: string) => {
      setSearchParams((previous) => {
        const next = new URLSearchParams(previous);

        if (search.trim().length >= 2) next.set("search", search.trim());
        else next.delete("search");

        next.delete("page");

        return next;
      });
    },
    [setSearchParams],
  );

  const setWithPhoto = useCallback(
    (withPhoto: boolean) => {
      setSearchParams((previous) => {
        const next = new URLSearchParams(previous);

        if (withPhoto) next.set("withPhoto", "true");
        else next.delete("withPhoto");

        next.delete("page");

        return next;
      });
    },
    [setSearchParams],
  );

  const setPage = useCallback(
    (page: number) => {
      setSearchParams((previous) => {
        const next = new URLSearchParams(previous);
        next.set("page", String(page));

        return next;
      });
    },
    [setSearchParams],
  );

  return { filters, setCategory, setSearch, setWithPhoto, setPage };
}

export { useRedListFilters };
