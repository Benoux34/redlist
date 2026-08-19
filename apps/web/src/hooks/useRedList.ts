import { useCallback } from "react";
import { useAsyncData } from "./useAsyncData";
import {
  redlistAssessmentsRequest,
  redlistCategoryCountsRequest,
} from "@/api/red-list";
import { useRedListFilters } from "./useRedListFilters";

function useRedList() {
  const { filters, setCategory, setSearch, setWithPhoto, setPage } =
    useRedListFilters();

  const loadAssessments = useCallback(
    () => redlistAssessmentsRequest(filters),
    [filters],
  );

  const assessments = useAsyncData(loadAssessments, [
    filters.category,
    filters.search,
    filters.withPhoto,
    filters.page,
  ]);

  const counts = useAsyncData(redlistCategoryCountsRequest, []);

  return {
    filters,
    setCategory,
    setSearch,
    setWithPhoto,
    setPage,
    assessments,
    counts,
  };
}

export { useRedList };
