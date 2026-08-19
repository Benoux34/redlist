import { useCallback } from "react";
import { redlistDetailRequest } from "../api/red-list";
import { useAsyncData } from "./useAsyncData";

function useSpeciesDetail(assessmentId: number | null) {
  const loader = useCallback(() => {
    if (assessmentId === null)
      return Promise.reject(new Error("Missing assessment id"));

    return redlistDetailRequest(assessmentId);
  }, [assessmentId]);

  return useAsyncData(loader, [assessmentId]);
}

export { useSpeciesDetail };
