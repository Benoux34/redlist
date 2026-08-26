import { Link } from "react-router";
import { ArrowRight, ExternalLink } from "lucide-react";
import { category_colors, getInitials } from "@/components/species-grid/utils";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/loading/Loading";
import { useSpeciesOfTheDay } from "@/hooks/use-species-of-the-day/useSpeciesOfTheDay";

const HomeSpeciesOfTheDay = () => {
  const { data: species, status } = useSpeciesOfTheDay();

  if (status === "error" || (status === "success" && !species)) return null;

  const category = species
    ? (category_colors[species.categoryCode] ?? {
        label: species.categoryCode,
        text: "text-[var(--color-ink-muted)]",
        dot: "bg-[var(--color-ink-muted)]",
      })
    : null;

  const initials = species ? getInitials(species.scientificName) : "—";

  return (
    <section className="mb-20 text-left">
      <div className="border border-[var(--color-paper-border)] bg-transparent">
        {status === "loading" || !species ? (
          <Loading
            label="Chargement de l'espèce du jour..."
            minHeight="min-h-[380px]"
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[var(--color-paper-border)]">
            <div className="flex flex-col justify-between bg-[var(--color-paper-muted)]/20 lg:col-span-5">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-paper-muted)]/40">
                {species.photoUrl ? (
                  <>
                    <img
                      src={species.photoUrl}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full object-cover blur-md opacity-25 scale-110"
                    />
                    <img
                      src={species.photoUrl}
                      alt={species.vernacularNameFr ?? species.scientificName}
                      className="relative h-full w-full object-contain p-4 transition-transform duration-500 hover:scale-105"
                    />
                  </>
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
                    <span className="font-serif text-5xl font-light italic tracking-widest text-[var(--color-ink-faint)]">
                      {initials}
                    </span>
                    <span className="mt-3 text-xs uppercase tracking-wider text-[var(--color-ink-faint)]">
                      Spécimen non photographié
                    </span>
                  </div>
                )}

                {category && (
                  <div className="absolute left-3 top-3 flex items-center gap-1.5 border border-[var(--color-paper-border)]/80 bg-[var(--color-paper)]/95 px-2.5 py-1 text-xs backdrop-blur-xs">
                    <span
                      className={`size-2 rounded-full ${category.dot}`}
                      aria-hidden="true"
                    />
                    <span className={`font-medium ${category.text}`}>
                      {species.categoryCode} • {category.label}
                    </span>
                  </div>
                )}

                {species.possiblyExtinct && (
                  <div className="absolute right-3 top-3 border border-[var(--color-status-cr)]/40 bg-[var(--color-status-cr-bg)] px-2.5 py-1 text-[11px] font-medium text-[var(--color-status-cr)] backdrop-blur-xs">
                    Présumée éteinte
                  </div>
                )}
              </div>

              <div className="border-t border-[var(--color-paper-border)] px-5 py-3 text-xs text-[var(--color-ink-faint)] flex items-center justify-between">
                <span className="truncate max-w-[70%]">
                  {species.photoAttribution ? (
                    <span>© {species.photoAttribution}</span>
                  ) : (
                    <span>Portail mondial UICN</span>
                  )}
                </span>
                {species.yearPublished && (
                  <span>Évalué en {species.yearPublished}</span>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-between px-5 sm:px-6 lg:px-7 pt-5 pb-4 lg:col-span-7 text-left">
              <div>
                <div className="mb-3.5">
                  {species.vernacularNameFr ? (
                    <>
                      <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[var(--color-ink)] mb-1 leading-tight">
                        {species.vernacularNameFr}
                      </h2>
                      <p className="font-serif text-base sm:text-lg italic text-[var(--color-ink-muted)]">
                        {species.scientificName}
                      </p>
                    </>
                  ) : (
                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium italic tracking-tight text-[var(--color-ink)] mb-1 leading-tight">
                      {species.scientificName}
                    </h2>
                  )}
                </div>

                {species.description && (
                  <p className="text-xs sm:text-sm leading-relaxed text-[var(--color-ink-muted)] line-clamp-3 sm:line-clamp-4">
                    {species.description}
                  </p>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 mt-4 border-t border-[var(--color-paper-border)] text-xs sm:text-sm">
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[var(--color-ink-faint)] block mb-0.5">
                      Statut UICN
                    </span>
                    <span
                      className={`font-serif font-medium text-sm sm:text-base ${category?.text}`}
                    >
                      {category?.label}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[var(--color-ink-faint)] block mb-0.5">
                      Évaluation
                    </span>
                    <span className="font-serif font-medium text-sm sm:text-base text-[var(--color-ink)]">
                      {species.yearPublished
                        ? `Année ${species.yearPublished}`
                        : "Référence UICN"}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[var(--color-ink-faint)] block mb-0.5">
                      Identifiant
                    </span>
                    <span className="font-mono text-xs text-[var(--color-ink-muted)]">
                      #{species.assessmentId}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-[var(--color-paper-border)] pt-3.5 mt-3.5 flex flex-wrap items-center justify-between gap-3">
                <Button
                  size="default"
                  className="h-9 px-4 text-xs font-medium"
                  render={<Link to={`/species/${species.assessmentId}`} />}
                >
                  <span>Consulter la fiche de l&apos;espèce du jour</span>
                  <ArrowRight className="size-3.5 ml-1" />
                </Button>

                {species.officialUrl && (
                  <a
                    href={species.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
                  >
                    <span>Portail officiel UICN</span>
                    <ExternalLink className="size-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export { HomeSpeciesOfTheDay };
