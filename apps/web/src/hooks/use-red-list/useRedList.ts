import { useCallback, useMemo } from "react";
import { redlistAssessmentsRequest } from "@/api/red-list";
import type { RedListFilters } from "@/api/red-list/entities";
import { useRedListFilters } from "../use-red-list-filters/useRedListFilters";
import { useAsyncData } from "../use-async-data/useAsyncData";

function useRedList(lockedFilters?: Partial<RedListFilters>) {
  const { filters, setCategory, setGroup, setSearch, setWithPhoto, setPage } =
    useRedListFilters();

  const effectiveFilters = useMemo(
    () => ({ ...filters, ...lockedFilters }),
    [filters, lockedFilters],
  );

  const loadAssessments = useCallback(
    () => redlistAssessmentsRequest(effectiveFilters),
    [effectiveFilters],
  );

  const assessments = useAsyncData(loadAssessments, [
    effectiveFilters.category,
    effectiveFilters.group,
    effectiveFilters.search,
    effectiveFilters.withPhoto,
    effectiveFilters.possiblyExtinct,
    effectiveFilters.letter,
    effectiveFilters.countryCode,
    effectiveFilters.page,
  ]);

  return {
    filters,
    setCategory,
    setGroup,
    setSearch,
    setPage,
    setWithPhoto,
    assessments,
  };
}

export { useRedList };
