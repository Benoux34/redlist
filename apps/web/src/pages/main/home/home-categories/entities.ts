import type { RedListCategoryCode } from "@app/contracts";

type CategoryGuideItem = Readonly<{
  code: RedListCategoryCode;
  labelFr: string;
  criterionSummary: string;
  description: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  dot: string;
}>;

export type { CategoryGuideItem };
