import type { FavoriteItem } from "@app/contracts";
import { SpeciesCard } from "@/components/species-grid/SpeciesCard";
import { getStatusChange } from "./utils";
import { TrendingDown, TrendingUp } from "lucide-react";

type Props = Readonly<{
  item: FavoriteItem;
}>;

const FollowedSpeciesCard = ({ item }: Props) => {
  const statusChange = getStatusChange(item);

  const banner = statusChange.hasChanged ? (
    <div
      className={`flex items-center gap-2 border-b px-4 py-2 text-xs font-medium ${
        statusChange.isImprovement
          ? "border-[var(--color-status-vu-border)] bg-[var(--color-status-vu-bg)] text-[var(--color-status-vu)]"
          : "border-[var(--color-status-cr-border)] bg-[var(--color-status-cr-bg)] text-[var(--color-status-cr)]"
      }`}
    >
      {statusChange.isImprovement ? (
        <TrendingUp className="size-3.5 shrink-0" aria-hidden="true" />
      ) : (
        <TrendingDown className="size-3.5 shrink-0" aria-hidden="true" />
      )}
      <span className="leading-snug">{statusChange.message}</span>
    </div>
  ) : undefined;

  return <SpeciesCard species={item} banner={banner} />;
};

export { FollowedSpeciesCard };
