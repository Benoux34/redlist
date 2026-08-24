import type { RedListDetail } from "@app/contracts";
import { Link } from "react-router";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { FavoriteButton } from "@/components/favorite-button/FavoriteButton";
import {
  category_colors,
  getInitials,
  getTrendLabel,
  translateSystem,
} from "./utils";

type Props = Readonly<{
  species: RedListDetail;
}>;

const SpeciesHero = ({ species }: Props) => {
  const category = category_colors[species.categoryCode] ?? {
    label: species.categoryCode,
    text: "text-[var(--color-ink-muted)]",
    dot: "bg-[var(--color-ink-muted)]",
    bg: "bg-[var(--color-paper-muted)]",
    border: "border-[var(--color-paper-border)]",
  };

  const initials = getInitials(species.scientificName);

  return (
    <section className="mb-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 border border-[var(--color-paper-border)] bg-transparent px-3 py-1.5 text-xs text-[var(--color-ink-muted)] hover:border-[var(--color-paper-border-strong)] hover:text-[var(--color-ink)] transition-colors"
        >
          <ChevronLeft className="size-3.5" />
          <span>Retour à la Liste Rouge</span>
        </Link>

        <FavoriteButton assessmentId={species.assessmentId} />
      </div>

      <div className="border border-[var(--color-paper-border)] bg-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[var(--color-paper-border)] bg-[var(--color-paper-muted)]/30 lg:col-span-5">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-paper-muted)]/40">
              {species.photoUrl ? (
                <>
                  <img
                    src={species.photoUrl}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover blur-md opacity-30 scale-110"
                  />
                  <img
                    src={species.photoUrl}
                    alt={species.vernacularNameFr ?? species.scientificName}
                    className="relative h-full w-full object-contain p-2"
                  />
                </>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
                  <span className="font-serif text-4xl font-light italic tracking-widest text-[var(--color-ink-faint)]">
                    {initials}
                  </span>
                  <span className="mt-3 text-xs uppercase tracking-wider text-[var(--color-ink-faint)]">
                    Spécimen non photographié
                  </span>
                </div>
              )}
            </div>

            <div className="border-t border-[var(--color-paper-border)]/60 px-5 py-2.5 text-xs text-[var(--color-ink-faint)]">
              {species.photoAttribution ? (
                <span className="truncate block">
                  © {species.photoAttribution}{" "}
                  {species.photoLicense ? `(${species.photoLicense})` : ""}
                </span>
              ) : (
                <span>Portail mondial UICN</span>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-7">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-[var(--color-ink-muted)]">
                <div className="inline-flex items-center gap-1.5 border border-[var(--color-paper-border)] px-2.5 py-0.5">
                  <span
                    className={`size-1.5 ${category.dot}`}
                    aria-hidden="true"
                  />
                  <span className={`font-medium ${category.text}`}>
                    {category.label}
                  </span>
                </div>

                {species.possiblyExtinct && (
                  <Link
                    to="/presumed-extinct"
                    className="border border-[var(--color-status-cr)]/40 bg-[var(--color-status-cr-bg)] px-2.5 py-0.5 font-medium text-[var(--color-status-cr)] hover:border-[var(--color-status-cr)] hover:underline transition-colors"
                    title="Découvrir les espèces présumées éteintes"
                  >
                    Peut-être éteint ↗
                  </Link>
                )}

                {species.yearPublished && (
                  <span className="text-[var(--color-ink-faint)]">
                    Évalué en {species.yearPublished}
                  </span>
                )}
              </div>

              <div className="mb-5">
                {species.vernacularNameFr ? (
                  <>
                    <h1 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[var(--color-ink)] mb-1">
                      {species.vernacularNameFr}
                    </h1>
                    <p className="font-serif text-lg sm:text-xl italic text-[var(--color-ink-muted)]">
                      <Link
                        to={`/especes/${(species.scientificName.trim()[0] ?? "a").toLowerCase()}`}
                        className="hover:text-[var(--color-ink)] hover:underline transition-colors"
                        title={`Voir l'index alphabétique des espèces en ${(species.scientificName.trim()[0] ?? "A").toUpperCase()}`}
                      >
                        {species.scientificName}
                      </Link>
                      {species.taxonomy.authority && (
                        <span className="ml-2 font-sans not-italic text-xs text-[var(--color-ink-faint)]">
                          {species.taxonomy.authority}
                        </span>
                      )}
                    </p>
                  </>
                ) : (
                  <>
                    <h1 className="font-serif text-3xl sm:text-4xl font-medium italic tracking-tight text-[var(--color-ink)] mb-1">
                      <Link
                        to={`/especes/${(species.scientificName.trim()[0] ?? "a").toLowerCase()}`}
                        className="hover:underline transition-colors"
                        title={`Voir l'index alphabétique des espèces en ${(species.scientificName.trim()[0] ?? "A").toUpperCase()}`}
                      >
                        {species.scientificName}
                      </Link>
                    </h1>
                    {species.taxonomy.authority && (
                      <p className="text-xs text-[var(--color-ink-faint)]">
                        {species.taxonomy.authority}
                      </p>
                    )}
                  </>
                )}

                {species.commonNameEn && (
                  <p className="mt-2 text-xs text-[var(--color-ink-muted)]">
                    Nom commun anglais :{" "}
                    <span className="text-[var(--color-ink)]">
                      {species.commonNameEn}
                    </span>
                  </p>
                )}
              </div>

              {species.description && (
                <p className="mb-6 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                  {species.description}
                </p>
              )}
            </div>

            <div className="border-t border-[var(--color-paper-border)]/70 pt-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="border border-[var(--color-paper-border)] px-3 py-1.5 text-[var(--color-ink)]">
                    <span className="text-[var(--color-ink-muted)]">
                      Tendance :{" "}
                    </span>
                    <strong>{getTrendLabel(species.population.trend)}</strong>
                  </span>

                  {species.systems.map((system) => (
                    <span
                      key={system}
                      className="border border-[var(--color-paper-border)] px-3 py-1.5 text-[var(--color-ink)]"
                    >
                      <span className="text-[var(--color-ink-muted)]">
                        Milieu :{" "}
                      </span>
                      <strong>{translateSystem(system)}</strong>
                    </span>
                  ))}

                  {species.isEndemic && (
                    <span className="border border-[var(--color-paper-border)] bg-[var(--color-paper-muted)]/50 px-3 py-1.5 font-medium text-[var(--color-ink)]">
                      Espèce endémique
                    </span>
                  )}
                </div>

                {species.officialUrl && (
                  <a
                    href={species.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 border border-[var(--color-paper-border-strong)] bg-[var(--color-paper)] px-3.5 py-1.5 text-xs text-[var(--color-ink)] hover:bg-[var(--color-paper-muted)] transition-colors"
                  >
                    <span>Fiche UICN</span>
                    <ExternalLink className="size-3 text-[var(--color-ink-muted)]" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { SpeciesHero };
