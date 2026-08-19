import {
  redListCategoryCounts,
  redListDetail,
  redListItem,
  redListPage,
  type RedListCategoryCount,
  type RedListDetail,
  type RedListItem,
  type RedListPage,
} from "@app/contracts";
import { apiGet } from "../client";
import type { RedListFilters } from "./entities";
import { buildQueryString } from "./utils";

function redlistAssessmentsRequest(
  filters: RedListFilters,
): Promise<RedListPage> {
  return apiGet(`/api/red-list?${buildQueryString(filters)}`, redListPage);
}

function redlistCategoryCountsRequest(): Promise<RedListCategoryCount[]> {
  return apiGet("/api/red-list/counts", redListCategoryCounts);
}

function redlistDetailRequest(assessmentId: number): Promise<RedListDetail> {
  return apiGet(`/api/red-list/${assessmentId}`, redListDetail);
}

function speciesOfTheDayRequest(): Promise<RedListItem> {
  return apiGet("/api/red-list/species-of-the-day", redListItem);
}

export {
  redlistAssessmentsRequest,
  redlistCategoryCountsRequest,
  redlistDetailRequest,
  speciesOfTheDayRequest,
};
