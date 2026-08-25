import type { RedListDetail, RedListItem } from "@app/contracts";

type MappedDetail = Omit<RedListDetail, keyof RedListItem>;
type WithDescription = {
  description?: { en?: string | null | undefined } | null | undefined;
};

export type { MappedDetail, WithDescription };
