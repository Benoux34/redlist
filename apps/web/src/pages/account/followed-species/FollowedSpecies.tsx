import { useAsyncData } from "@/hooks/useAsyncData";
import { favoritesRequest } from "@/api/favorite";
import { FollowedSpeciesEmpty } from "./FollowedSpeciesEmpty";
import { FollowedSpeciesCard } from "./FollowedSpeciesCard";
import { sortFollowedSpecies } from "./utils";
import { Loading } from "@/components/loading/Loading";
import { FollowedSpeciesError } from "./FollowedSpeciesError";

const FollowedSpecies = () => {
  const favorites = useAsyncData(favoritesRequest, []);
  if (favorites.status === "loading")
    return (
      <Loading label="Chargement de vos espèces suivies..." className="mb-14" />
    );
  if (favorites.status === "error")
    return <FollowedSpeciesError reload={favorites.reload} />;

  const items = favorites.data.items;
  const total = favorites.data.total;
  const changedCount = items.filter((item) => item.categoryChanged).length;
  const sortedItems = sortFollowedSpecies(items);

  return (
    <section className="mb-16">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 border-b border-[var(--color-paper-border)] pb-2.5">
        <h2 className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-[var(--color-ink)]">
          Espèces suivies
        </h2>

        <div className="flex items-center gap-3 text-xs sm:text-sm text-[var(--color-ink-muted)]">
          <span className="font-medium text-[var(--color-ink)]">
            {total} {total > 1 ? "espèces suivies" : "espèce suivie"}
          </span>

          {changedCount > 0 && (
            <>
              <span className="text-[var(--color-ink-faint)]">•</span>
              <span className="font-medium text-[var(--color-status-cr)]">
                {changedCount}{" "}
                {changedCount > 1 ? "statuts ont évolué" : "statut a évolué"}
              </span>
            </>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        <FollowedSpeciesEmpty />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedItems.map((item) => (
            <FollowedSpeciesCard key={item.assessmentId} item={item} />
          ))}
        </div>
      )}
    </section>
  );
};

export { FollowedSpecies };
