import { useCallback, useEffect, useReducer, useState } from "react";

type AsyncState<T> =
  | { status: "loading"; data: null; error: null }
  | { status: "success"; data: T; error: null }
  | { status: "error"; data: null; error: Error };

type Action<T> =
  { type: "resolved"; data: T } | { type: "rejected"; error: Error };

function reducer<T>(_state: AsyncState<T>, action: Action<T>): AsyncState<T> {
  return action.type === "resolved"
    ? { status: "success", data: action.data, error: null }
    : { status: "error", data: null, error: action.error };
}

const LOADING = { status: "loading", data: null, error: null } as const;

function useAsyncData<T>(
  loader: () => Promise<T>,
  deps: readonly unknown[],
): AsyncState<T> & { reload: () => void } {
  const depsKey = JSON.stringify(deps);

  const [reloadToken, setReloadToken] = useState(0);
  const [state, dispatch] = useReducer(reducer<T>, LOADING as AsyncState<T>);
  const [settledKey, setSettledKey] = useState<string | null>(null);

  const reload = useCallback(() => {
    setSettledKey(null);
    setReloadToken((token) => token + 1);
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
  }, [depsKey, reloadToken, loader]);

  const current: AsyncState<T> =
    settledKey === depsKey ? state : (LOADING as AsyncState<T>);

  return { ...current, reload };
}

export { useAsyncData };
