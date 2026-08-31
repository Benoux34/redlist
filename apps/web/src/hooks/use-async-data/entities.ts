type AsyncState<T> =
  | { status: "loading"; data: null; error: null }
  | { status: "success"; data: T; error: null }
  | { status: "error"; data: null; error: Error };

type Action<T> =
  { type: "resolved"; data: T } | { type: "rejected"; error: Error };

export type { AsyncState, Action };
