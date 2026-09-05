import {
  groupCounts,
  redListCategoryCounts,
  redListDetail,
  redListItem,
  redListPage,
  redListVersion,
  type GroupCount,
  type GroupCountsQuery,
  type RedListCategoryCount,
  type RedListDetail,
  type RedListItem,
  type RedListPage,
  type RedListVersion,
} from "@app/contracts";
import { apiGet } from "../client";
import type { RedListFilters } from "./entities";
import { buildGroupCountsQuery, buildQueryString } from "./utils";

function redlistAssessmentsRequest(
  filters: Partial<RedListFilters>,
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

function redlistVersionRequest(): Promise<RedListVersion> {
  return apiGet("/api/red-list/version", redListVersion);
}

function groupCountsRequest(scope?: GroupCountsQuery): Promise<GroupCount[]> {
  const query = buildGroupCountsQuery(scope);

  return apiGet(
    `/api/red-list/groups${query === "" ? "" : `?${query}`}`,
    groupCounts,
  );
}

export {
  redlistAssessmentsRequest,
  redlistCategoryCountsRequest,
  redlistDetailRequest,
  speciesOfTheDayRequest,
  redlistVersionRequest,
  groupCountsRequest,
};
