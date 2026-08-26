import { speciesOfTheDayRequest } from "@/api/red-list";
import { useAsyncData } from "../use-async-data/useAsyncData";

function useSpeciesOfTheDay() {
  return useAsyncData(speciesOfTheDayRequest, []);
}

export { useSpeciesOfTheDay };
