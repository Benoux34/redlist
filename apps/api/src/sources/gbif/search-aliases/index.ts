import type { SpeciesGroup } from "@app/contracts";
import { SEARCH_ALIASES } from "./utils";

function aliasFor(search: string): SpeciesGroup | null {
  const key = search
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\s-]/g, "");

  return SEARCH_ALIASES[key] ?? SEARCH_ALIASES[key.replace(/s$/, "")] ?? null;
}

export { aliasFor, SEARCH_ALIASES };
