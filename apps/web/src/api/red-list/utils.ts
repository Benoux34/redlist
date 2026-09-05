import type { GroupCountsQuery } from "@app/contracts";
import type { RedListFilters } from "./entities";

function buildQueryString(filters: Partial<RedListFilters>): string {
  const params = new URLSearchParams();

  if (filters.category) params.set("category", filters.category);
  if (filters.group) params.set("group", filters.group);
  if (filters.search) params.set("search", filters.search);
  if (filters.withPhoto) params.set("withPhoto", "true");
  if (filters.possiblyExtinct) params.set("possiblyExtinct", "true");
  if (filters.letter) params.set("letter", filters.letter);
  if (filters.countryCode) params.set("countryCode", filters.countryCode);
  if (filters.page) params.set("page", String(filters.page));

  return params.toString();
}

export { buildQueryString };

function buildGroupCountsQuery(scope: GroupCountsQuery | undefined): string {
  const params = new URLSearchParams();

  if (scope?.letter) params.set("letter", scope.letter);
  if (scope?.countryCode) params.set("countryCode", scope.countryCode);
  if (scope?.possiblyExtinct === true) params.set("possiblyExtinct", "true");

  return params.toString();
}

export { buildGroupCountsQuery };
