import { useCallback, useEffect, useReducer, useState } from "react";
import type { AsyncState } from "./entities";
import { LOADING, reducer } from "./utils";

function useAsyncData<T>(
  loader: () => Promise<T>,
  deps: readonly unknown[],
): AsyncState<T> & { reload: () => void } {
  const depsKey = JSON.stringify(deps);

  const [reloadToken, setReloadToken] = useState<number>(0);
  const [state, dispatch] = useReducer(reducer<T>, LOADING as AsyncState<T>);
  const [settledKey, setSettledKey] = useState<string | null>(null);

  const reload = useCallback(() => {
    setSettledKey(null);
    setReloadToken((token: number) => token + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    loader()
      .then((data) => {
        if (cancelled) return;

        dispatch({ type: "resolved", data });
        setSettledKey(depsKey);
      })
      .catch((error: unknown) => {
        if (cancelled) return;

        dispatch({
          type: "rejected",
          error: error instanceof Error ? error : new Error("Unknown error"),
        });
        setSettledKey(depsKey);
      });

    return () => {
      cancelled = true;
    };
  }, [loader, depsKey, reloadToken]);

  const isStale = settledKey !== depsKey;

  return {
    status: isStale ? "loading" : state.status,
    data: isStale ? null : state.data,
    error: isStale ? null : state.error,
    reload,
  } as AsyncState<T> & { reload: () => void };
}

export { useAsyncData };
