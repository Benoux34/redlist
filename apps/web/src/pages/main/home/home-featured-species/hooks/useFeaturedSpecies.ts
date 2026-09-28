import { featuredSpeciesRequest } from "@/api/red-list";
import { useAsyncData } from "@/hooks/use-async-data/useAsyncData";

function useFeaturedSpecies() {
  const { data, status } = useAsyncData(featuredSpeciesRequest, []);

  return { species: data, status };
}

export { useFeaturedSpecies };
