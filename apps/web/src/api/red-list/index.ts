import {
  redListCategoryCounts,
  redListDetail,
  redListItem,
  redListPage,
  redListVersion,
  type RedListCategoryCount,
  type RedListDetail,
  type RedListItem,
  type RedListPage,
  type RedListVersion,
} from "@app/contracts";
import { apiGet } from "../client";
import type { RedListFilters } from "./entities";
import { buildQueryString } from "./utils";
import z from "zod";

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

function speciesByNamesRequest(names: string[]): Promise<RedListItem[]> {
  const params = new URLSearchParams({ names: names.join(",") });

  return apiGet(
    `/api/red-list/by-names?${params.toString()}`,
    z.array(redListItem),
  );
}

export {
  redlistAssessmentsRequest,
  redlistCategoryCountsRequest,
  redlistDetailRequest,
  speciesOfTheDayRequest,
  redlistVersionRequest,
  speciesByNamesRequest,
};
