import type { Action, AsyncState, Resolved } from "./entities";

const LOADING = { status: "loading", data: null, error: null } as const;

function reducer<T>(_state: AsyncState<T>, action: Action<T>): AsyncState<T> {
  return action.type === "resolved"
    ? { status: "success", data: action.data, error: null }
    : { status: "error", data: null, error: action.error };
}

function resolveState<T>(
  state: AsyncState<T>,
  isStale: boolean,
  keepPreviousData: boolean,
): Resolved<T> {
  if (keepPreviousData && isStale && state.status === "success")
    return { ...state, isRefreshing: true };

  return {
    status: isStale ? "loading" : state.status,
    data: isStale ? null : state.data,
    error: isStale ? null : state.error,
    isRefreshing: isStale,
  } as Resolved<T>;
}

export { LOADING, reducer, resolveState };
