type AsyncState<T> =
  | { status: "loading"; data: null; error: null }
  | { status: "success"; data: T; error: null }
  | { status: "error"; data: null; error: Error };

type Action<T> =
  { type: "resolved"; data: T } | { type: "rejected"; error: Error };

type AsyncOptions = Readonly<{
  keepPreviousData?: boolean;
}>;

type AsyncResult<T> = AsyncState<T> &
  Readonly<{
    reload: () => void;
    isRefreshing: boolean;
  }>;

type Resolved<T> = AsyncState<T> & { isRefreshing: boolean };

export type { AsyncState, Action, AsyncOptions, AsyncResult, Resolved };
