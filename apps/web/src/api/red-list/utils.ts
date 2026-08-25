import type { RedListFilters } from "./entities";

function buildQueryString(filters: Partial<RedListFilters>): string {
  const params = new URLSearchParams();

  if (filters.category) params.set("category", filters.category);
  if (filters.search) params.set("search", filters.search);
  if (filters.withPhoto) params.set("withPhoto", "true");
  if (filters.possiblyExtinct) params.set("possiblyExtinct", "true");
  if (filters.letter) params.set("letter", filters.letter);
  if (filters.countryCode) params.set("countryCode", filters.countryCode);
  if (filters.page) params.set("page", String(filters.page));

  return params.toString();
}

export { buildQueryString };
