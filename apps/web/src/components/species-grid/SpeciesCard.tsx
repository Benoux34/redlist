import type { ReactNode } from "react";
import type { RedListItem } from "@app/contracts";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router";
import { category_colors, getInitials } from "./utils";

type Props = Readonly<{
  species: RedListItem;
  banner?: ReactNode;
}>;

const SpeciesCard = ({ species, banner }: Props) => {
  const category = category_colors[species.categoryCode] ?? {
    label: species.categoryCode,
    text: "text-[var(--color-ink-muted)]",
    dot: "bg-[var(--color-ink-muted)]",
  };

  const initials = getInitials(species.scientificName);

  return (
    <Link
      to={`/species/${species.assessmentId}`}
      className="group flex flex-col justify-between border border-[var(--color-paper-border)] bg-transparent transition-colors hover:border-[var(--color-paper-border-strong)] cursor-pointer"
    >
      <div>
        {banner}
        <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-[var(--color-paper-border)]">
          {species.photoUrl ? (
            <>
              <img
                src={species.photoUrl}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover blur-md opacity-100 scale-110"
              />
              <img
                src={species.photoUrl}
                alt={species.vernacularNameFr ?? species.scientificName}
                loading="lazy"
                className="relative h-full w-full object-contain p-1 transition-transform duration-500 group-hover:scale-105"
              />
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
              <span className="font-serif text-3xl font-light italic tracking-widest text-[var(--color-ink-faint)]">
                {initials}
              </span>
              <span className="mt-2 text-[11px] uppercase tracking-wider text-[var(--color-ink-faint)]">
                Spécimen non photographié
              </span>
            </div>
          )}

          <div className="absolute left-3 top-3 flex items-center gap-1.5 border border-[var(--color-paper-border)]/80 bg-[var(--color-paper)]/95 px-2.5 py-1 text-xs backdrop-blur-xs">
            <span
              className={`h-1.5 w-1.5 rounded-full ${category.dot}`}
              aria-hidden="true"
            />
            <span className={`font-medium ${category.text}`}>
              {species.categoryCode}
            </span>
          </div>

          {species.possiblyExtinct && (
            <div className="absolute right-3 top-3 border border-[var(--color-status-extinct)]/30 bg-[var(--color-status-extinct-bg)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-status-extinct)]">
              Peut-être éteint
            </div>
          )}
        </div>

        <div className="p-5 sm:p-6">
          <div className="mb-2 flex items-center justify-between text-xs text-[var(--color-ink-faint)]">
            <span>
              {species.yearPublished
                ? `Évalué en ${species.yearPublished}`
                : "Évaluation UICN"}
            </span>
          </div>

          {species.vernacularNameFr ? (
            <div className="mb-3">
              <h3 className="font-serif text-lg font-medium tracking-tight text-[var(--color-ink)]">
                {species.vernacularNameFr}
              </h3>
              <p className="font-serif text-sm italic text-[var(--color-ink-muted)]">
                {species.scientificName}
              </p>
            </div>
          ) : (
            <div className="mb-3">
              <h3 className="font-serif text-lg sm:text-xl font-medium italic tracking-tight text-[var(--color-ink)]">
                {species.scientificName}
              </h3>
            </div>
          )}

          {species.description && (
            <p className="mb-4 line-clamp-3 text-xs leading-relaxed text-[var(--color-ink-muted)]">
              {species.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[var(--color-paper-border)]/60 px-5 py-3 text-xs text-[var(--color-ink-faint)]">
        <div className="max-w-[70%] truncate">
          {species.photoAttribution ? (
            <span
              title={`Photo : ${species.photoAttribution} (${species.photoLicense ?? "Licence standard"})`}
            >
              © {species.photoAttribution}
            </span>
          ) : (
            <span>Liste Rouge UICN</span>
          )}
        </div>

        {species.officialUrl && (
          <a
            href={species.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)]"
            title="Consulter la fiche officielle sur le portail UICN"
          >
            <span>Fiche</span>
            <ExternalLink className="size-3" />
          </a>
        )}
      </div>
    </Link>
  );
};

export { SpeciesCard };
