import { useCallback } from "react";
import { useSearchParams } from "react-router";
import type { ThreatKey } from "@/components/threats/entities";
import { CAUSE_PARAM, parseCause } from "../utils";

function useCauseFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const cause = parseCause(searchParams.get(CAUSE_PARAM));

  const setCause = useCallback(
    (next: ThreatKey | null) => {
      setSearchParams(
        (previous) => {
          const params = new URLSearchParams(previous);

          if (next === null) params.delete(CAUSE_PARAM);
          else params.set(CAUSE_PARAM, next);

          return params;
        },
        { replace: true, preventScrollReset: true },
      );
    },
    [setSearchParams],
  );

  return { cause, setCause };
}

export { useCauseFilter };
