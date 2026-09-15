import { useCallback } from "react";
import type { RedListPage } from "@app/contracts";
import { redlistAssessmentsRequest } from "@/api/red-list";
import { useAsyncData } from "@/hooks/use-async-data/useAsyncData";
import { useDebounce } from "@/hooks/use-debounce/useDebounce";
import { SPECIES_DEBOUNCE_MS, SPECIES_SHOWN } from "./utils";

function useCountrySpecies(iso: string | null) {
  const debounced = useDebounce(iso, SPECIES_DEBOUNCE_MS);

  const loader = useCallback((): Promise<RedListPage | null> => {
    if (debounced === null) return Promise.resolve(null);

    return redlistAssessmentsRequest({
      countryCode: debounced,
      withPhoto: true,
      page: 1,
    });
  }, [debounced]);

  const state = useAsyncData(loader, [debounced]);

  return {
    species: (state.data?.items ?? []).slice(0, SPECIES_SHOWN),
    isLoading: state.status === "loading" && debounced !== null,
  };
}

export { useCountrySpecies };
