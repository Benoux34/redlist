import type { RedListDetail } from "@app/contracts";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { ChevronLeft, ExternalLink, Maximize2 } from "lucide-react";
import { Reveal } from "@/components/reveal/Reveal";
import { useInView } from "@/hooks/use-in-view/useInView";
import { PhotoLightbox } from "./photo-lightbox/PhotoLightbox";
import { FavoriteButton } from "@/components/favorite-button/FavoriteButton";
import {
  backLinkClass,
  category_colors,
  getInitials,
  getTrendLabel,
  translateSystem,
} from "./utils";

type Props = Readonly<{
  species: RedListDetail;
}>;

const SpeciesHero = ({ species }: Props) => {
  const navigate = useNavigate();
  const { key } = useLocation();
  const cameFromApp = key !== "default";
  const { ref, inView } = useInView<HTMLDivElement>();
  const [isPhotoOpen, setIsPhotoOpen] = useState<boolean>(false);

  const category = category_colors[species.categoryCode] ?? {
    label: species.categoryCode,
    text: "text-[var(--color-ink-muted)]",
    dot: "bg-[var(--color-ink-muted)]",
    bg: "bg-[var(--color-paper-muted)]",
    border: "border-[var(--color-paper-border)]",
  };

  const initials = getInitials(species.scientificName);
  const name = species.vernacularNameFr ?? species.scientificName;
  const photoCaption = species.photoAttribution
    ? `© ${species.photoAttribution}${species.photoLicense ? ` (${species.photoLicense})` : ""}`
    : null;

  return (
    <section className="mb-20">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        {cameFromApp ? (
          <button
            type="button"
            onClick={() => void navigate(-1)}
            className={backLinkClass}
          >
            <ChevronLeft className="size-3.5" />
            <span>Retour</span>
          </button>
        ) : (
          <Link
            viewTransition
            to="/threatened-species"
            className={backLinkClass}
          >
            <ChevronLeft className="size-3.5" />
            <span>Retour à la Liste Rouge</span>
          </Link>
        )}

        <FavoriteButton assessmentId={species.assessmentId} />
      </div>

      <div
        ref={ref}
        className="border border-[var(--color-paper-border)] bg-transparent"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <Reveal
            inView={inView}
            className="flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[var(--color-paper-border)] bg-[var(--color-paper-muted)]/30 lg:col-span-5"
          >
            <div className="group relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-paper-muted)]/40">
              {species.photoUrl ? (
                <>
                  <img
                    src={species.photoUrl}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover blur-md opacity-30 scale-110"
                  />
                  <button
                    type="button"
                    onClick={() => setIsPhotoOpen(true)}
                    aria-label="Agrandir la photo"
                    className="relative block h-full w-full cursor-zoom-in"
                  >
                    <img
                      src={species.photoUrl}
                      alt={name}
                      className="h-full w-full object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <span className="absolute bottom-3 right-3 flex size-8 translate-y-1 items-center justify-center border border-[var(--color-paper-border)] bg-[var(--color-paper)]/90 text-[var(--color-ink)] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <Maximize2 className="size-3.5" />
                    </span>
                  </button>
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
          </Reveal>

          <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-7">
            <div>
              <Reveal inView={inView} index={1}>
                <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-[var(--color-ink-muted)]">
                  <div className="inline-flex items-center gap-1.5 border border-[var(--color-paper-border)] px-2.5 py-0.5">
                    <span className="relative flex size-1.5" aria-hidden="true">
                      {species.categoryCode === "CR" && (
                        <span
                          className={`absolute inset-0 animate-ping opacity-75 motion-reduce:animate-none ${category.dot}`}
                        />
                      )}
                      <span className={`relative size-1.5 ${category.dot}`} />
                    </span>
                    <span className={`font-medium ${category.text}`}>
                      {category.label}
                    </span>
                  </div>

                  {species.possiblyExtinct && (
                    <Link
                      viewTransition
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
              </Reveal>

              <Reveal inView={inView} index={2}>
                <div className="mb-5">
                  {species.vernacularNameFr ? (
                    <>
                      <h1 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[var(--color-ink)] mb-1">
                        {species.vernacularNameFr}
                      </h1>
                      <p className="font-serif text-lg sm:text-xl italic text-[var(--color-ink-muted)]">
                        <Link
                          viewTransition
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
                          viewTransition
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
              </Reveal>

              {species.description && (
                <Reveal inView={inView} index={3}>
                  <p className="mb-6 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                    {species.description}
                  </p>
                </Reveal>
              )}
            </div>

            <Reveal
              inView={inView}
              index={4}
              className="border-t border-[var(--color-paper-border)]/70 pt-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="border border-[var(--color-paper-border)] px-3 py-1.5 text-[var(--color-ink)] transition-colors hover:border-[var(--color-paper-border-strong)] hover:bg-[var(--color-paper-muted)]/40">
                    <span className="text-[var(--color-ink-muted)]">
                      Tendance :{" "}
                    </span>
                    <strong>{getTrendLabel(species.population.trend)}</strong>
                  </span>

                  {species.systems.map((system) => (
                    <span
                      key={system}
                      className="border border-[var(--color-paper-border)] px-3 py-1.5 text-[var(--color-ink)] transition-colors hover:border-[var(--color-paper-border-strong)] hover:bg-[var(--color-paper-muted)]/40"
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
                    className="group inline-flex items-center gap-1.5 border border-[var(--color-paper-border-strong)] bg-[var(--color-paper)] px-3.5 py-1.5 text-xs text-[var(--color-ink)] hover:bg-[var(--color-paper-muted)] transition-colors"
                  >
                    <span>Fiche UICN</span>
                    <ExternalLink className="size-3 text-[var(--color-ink-muted)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <PhotoLightbox
        src={isPhotoOpen ? species.photoUrl : null}
        alt={name}
        caption={photoCaption}
        onClose={() => setIsPhotoOpen(false)}
      />
    </section>
  );
};

export { SpeciesHero };
