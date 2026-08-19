import { useCallback, useEffect, useState } from "react";
import type { AsyncState } from "@/api/red-list/entities";

function useAsyncData<T>(
  loader: () => Promise<T>,
  deps: readonly unknown[],
): AsyncState<T> & { reload: () => void } {
  const [state, setState] = useState<AsyncState<T>>({
    status: "loading",
    data: null,
    error: null,
  });
  const [reloadToken, setReloadToken] = useState<number>(0);

  const reload = useCallback(() => {
    setReloadToken((token) => token + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading", data: null, error: null });

    loader()
      .then((data) => {
        if (cancelled) return;

        setState({ status: "success", data, error: null });
      })
      .catch((error: unknown) => {
        if (cancelled) return;

        setState({
          status: "error",
          data: null,
          error: error instanceof Error ? error : new Error("Unknown error"),
        });
      });

    return () => {
      cancelled = true;
    };
  }, [...deps, reloadToken]);

  return { ...state, reload };
}

export { useAsyncData };
