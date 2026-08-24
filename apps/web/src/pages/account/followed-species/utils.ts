import type { FavoriteItem } from "@app/contracts";
import type { StatusChange } from "./entities";

const CATEGORY_RANKS: Record<string, number> = {
  VU: 1,
  EN: 2,
  CR: 3,
  EW: 4,
  EX: 5,
};

const CATEGORY_NAMES: Record<string, string> = {
  VU: "Vulnérable (VU)",
  EN: "En danger (EN)",
  CR: "En danger critique (CR)",
  EW: "Éteint à l'état sauvage (EW)",
  EX: "Éteint (EX)",
};

function getStatusChange(item: FavoriteItem): StatusChange {
  if (!item.categoryChanged || item.categoryAtAdd === item.categoryCode)
    return {
      hasChanged: false,
      isImprovement: false,
      message: "",
    };

  const prevRank = CATEGORY_RANKS[item.categoryAtAdd] ?? 0;
  const currRank = CATEGORY_RANKS[item.categoryCode] ?? 0;
  const isImprovement = currRank < prevRank;

  const prevName = CATEGORY_NAMES[item.categoryAtAdd] ?? item.categoryAtAdd;
  const currName = CATEGORY_NAMES[item.categoryCode] ?? item.categoryCode;

  const message = isImprovement
    ? `Situation améliorée : Passée de ${prevName} à ${currName}`
    : `Menace aggravée : Passée de ${prevName} à ${currName}`;

  return {
    hasChanged: true,
    isImprovement,
    message,
  };
}

function sortFollowedSpecies(items: FavoriteItem[]): FavoriteItem[] {
  return [...items].sort((a, b) => {
    if (a.categoryChanged && !b.categoryChanged) return -1;
    if (!a.categoryChanged && b.categoryChanged) return 1;

    return new Date(b.followedAt).getTime() - new Date(a.followedAt).getTime();
  });
}

export { getStatusChange, sortFollowedSpecies, CATEGORY_NAMES };
