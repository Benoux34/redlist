import type { Action, AsyncState } from "./entities";

const LOADING = { status: "loading", data: null, error: null } as const;

function reducer<T>(_state: AsyncState<T>, action: Action<T>): AsyncState<T> {
  return action.type === "resolved"
    ? { status: "success", data: action.data, error: null }
    : { status: "error", data: null, error: action.error };
}

export { LOADING, reducer };
