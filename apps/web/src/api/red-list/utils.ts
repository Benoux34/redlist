import type { RedListFilters } from "./entities";

function buildQueryString(filters: RedListFilters): string {
  const params = new URLSearchParams();

  if (filters.category !== null) params.set("category", filters.category);
  if (filters.search !== null) params.set("search", filters.search);
  if (filters.withPhoto) params.set("withPhoto", "true");
  params.set("page", String(filters.page));

  return params.toString();
}

export { buildQueryString };
