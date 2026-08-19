import { speciesOfTheDayRequest } from "../api/red-list";
import { useAsyncData } from "./useAsyncData";

function useSpeciesOfTheDay() {
  return useAsyncData(speciesOfTheDayRequest, []);
}

export { useSpeciesOfTheDay };
