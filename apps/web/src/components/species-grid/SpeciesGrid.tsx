import type { RedListPage } from "@app/contracts";
import type { AsyncState } from "@/api/red-list/entities";
import { SpeciesCard } from "./SpeciesCard";
import { Loading } from "@/components/loading/Loading";
import { group_labels } from "./utils";

type Props = Readonly<{
  assessments: AsyncState<RedListPage>;
  onRetry?: () => void;
}>;

const SpeciesGrid = ({ assessments, onRetry }: Props) => {
  if (assessments.status === "loading")
    return <Loading className="mb-12" label="Chargement des espèces..." />;

  if (assessments.status === "error")
    return (
      <section className="mb-12 border border-[var(--color-paper-border)] p-10 text-center">
        <h3 className="font-serif text-xl font-medium text-[var(--color-ink)] mb-2">
          Impossible de charger les données
        </h3>
        <p className="text-sm text-[var(--color-ink-muted)] mb-6 max-w-md mx-auto">
          Une erreur est survenue lors de la récupération des espèces auprès du
          serveur.
        </p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="border border-[var(--color-paper-border-strong)] bg-[var(--color-paper-card)] px-4 py-2 text-xs font-medium text-[var(--color-ink)] hover:bg-[var(--color-paper-muted)] transition-colors cursor-pointer"
          >
            Réessayer
          </button>
        )}
      </section>
    );

  const { items, resolvedAs, total } = assessments.data;

  if (items.length === 0)
    return (
      <section className="mb-12 border border-[var(--color-paper-border)] p-12 text-center">
        <p className="font-serif text-2xl font-light italic text-[var(--color-ink-muted)] mb-3">
          Aucun spécimen trouvé
        </p>
        <p className="text-sm text-[var(--color-ink-faint)] max-w-md mx-auto">
          Aucune espèce ne correspond à ces critères de recherche dans cette
          catégorie.
        </p>
      </section>
    );

  return (
    <section className="mb-12">
      {resolvedAs !== null && (
        <div className="mb-6 border-l-2 border-[var(--color-paper-border-strong)] pl-3 text-sm text-[var(--color-ink-muted)]">
          <p>
            Aucune espèce ne s&apos;appelle «&nbsp;{resolvedAs.from}&nbsp;».
            Voici les {new Intl.NumberFormat("fr-FR").format(total)}{" "}
            {group_labels[resolvedAs.group].toLowerCase()}.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((species) => (
          <SpeciesCard key={species.assessmentId} species={species} />
        ))}
      </div>
    </section>
  );
};

export { SpeciesGrid };
