import { Database, Calendar } from "lucide-react";
import type { RedListVersion } from "@app/contracts";

type Props = Readonly<{
  version: RedListVersion | null;
}>;

const MethodologyHero = ({ version }: Props) => {
  const syncDate = version?.lastSyncedAt
    ? new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(version.lastSyncedAt))
    : null;

  return (
    <section className="mb-12 text-left">
      <h1 className="font-serif text-4xl font-medium tracking-tight text-[var(--color-ink)] md:text-5xl mb-4">
        Méthodologie & sources des données
      </h1>

      <p className="text-base sm:text-lg leading-relaxed text-[var(--color-ink-muted)] mb-8">
        Ce projet propose une restitution sobre, documentée et rigoureuse des
        évaluations scientifiques mondiales de la biodiversité menacée. Cette
        page explicite la provenance des jeux de données, les choix de filtrage
        appliqués et les limites méthodologiques incontournables.
      </p>

      <div className="flex flex-wrap items-center gap-4 sm:gap-8 border border-[var(--color-paper-border)] bg-[var(--color-paper-muted)]/30 p-4 sm:p-5 text-xs text-[var(--color-ink-muted)]">
        <div className="flex items-center gap-2">
          <Database className="size-4 text-[var(--color-ink)]" />
          <span>
            Jeu de données de référence :{" "}
            <strong className="font-medium text-[var(--color-ink)]">
              {version?.redListVersion
                ? `Liste Rouge UICN ${version.redListVersion}`
                : "Liste Rouge mondiale de l'UICN"}
            </strong>
          </span>
        </div>

        {syncDate && (
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-[var(--color-ink)]" />
            <span>
              Dernière synchronisation serveur :{" "}
              <strong className="font-medium text-[var(--color-ink)]">
                {syncDate}
              </strong>
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export { MethodologyHero };
