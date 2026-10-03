import type { FavoriteList } from "@app/contracts";
import { categoryLabel } from "@/modules/redlist/service";

const NOT_AUTHENTICATED =
  "Aucun utilisateur identifié. Connectez votre compte Redlist pour accéder à vos espèces suivies.";

function formatFollowedSpecies(
  favorites: FavoriteList,
  webOrigin: string,
): string {
  if (favorites.total === 0)
    return "Vous ne suivez encore aucune espèce sur Redlist.";

  const date = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" });

  const lines = favorites.items.map((item) => {
    const name =
      item.vernacularNameFr === null
        ? item.scientificName
        : `${item.vernacularNameFr} (${item.scientificName})`;
    const change = item.categoryChanged
      ? ` Statut modifié depuis le début du suivi (avant : ${categoryLabel(item.categoryAtAdd)}).`
      : "";

    return `- ${name} : ${categoryLabel(item.categoryCode)}, suivie depuis le ${date.format(new Date(item.followedAt))}.${change} ${webOrigin}/species/${item.assessmentId}`;
  });

  return [
    `${favorites.total} ${favorites.total > 1 ? "espèces suivies" : "espèce suivie"} :`,
    ...lines,
  ].join("\n");
}

export { NOT_AUTHENTICATED, formatFollowedSpecies };
