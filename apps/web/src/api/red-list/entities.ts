type RedListFilters = Readonly<{
  category: string | null;
  group: string | null;
  search: string | null;
  withPhoto: boolean;
  possiblyExtinct: boolean;
  letter: string | null;
  countryCode: string | null;
  page: number;
}>;

type AsyncState<T> =
  | { status: "loading"; data: null; error: null }
  | { status: "success"; data: T; error: null }
  | { status: "error"; data: null; error: Error };

export type { AsyncState, RedListFilters };
