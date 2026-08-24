import { useCallback, useMemo } from "react";
import { useAsyncData } from "./useAsyncData";
import {
  redlistAssessmentsRequest,
  redlistCategoryCountsRequest,
} from "@/api/red-list";
import { useRedListFilters } from "./useRedListFilters";
import type { RedListFilters } from "@/api/red-list/entities";

function useRedList(lockedFilters?: Partial<RedListFilters>) {
  const { filters, setCategory, setSearch, setWithPhoto, setPage } =
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
    effectiveFilters.search,
    effectiveFilters.withPhoto,
    effectiveFilters.possiblyExtinct,
    effectiveFilters.letter,
    effectiveFilters.countryCode,
    effectiveFilters.page,
  ]);

  const counts = useAsyncData(redlistCategoryCountsRequest, []);

  return {
    filters,
    setCategory,
    setSearch,
    setPage,
    setWithPhoto,
    assessments,
    counts,
  };
}

export { useRedList };
