import { useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";

type Props = Readonly<{
  citation: string | null;
  assessors: string | null;
  officialUrl: string | null;
  yearPublished: number | null;
}>;

const SpeciesCitation = ({
  citation,
  assessors,
  officialUrl,
  yearPublished,
}: Props) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    if (!citation) return;

    navigator.clipboard
      .writeText(citation)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        setCopied(false);
      });
  };

  if (!citation && !assessors && !officialUrl) return null;

  return (
    <section className="mb-14">
      <div className="mb-4 flex items-baseline justify-between border-b border-[var(--color-paper-border)] pb-2.5">
        <p className="text-sm font-medium tracking-wide text-[var(--color-ink-muted)]">
          Références scientifiques • Colophon
        </p>
      </div>

      <div className="border border-[var(--color-paper-border)] bg-transparent p-6 sm:p-8">
        {assessors && (
          <div className="mb-6">
            <h3 className="text-xs uppercase tracking-wider text-[var(--color-ink-faint)] mb-1.5">
              Évaluateurs scientifiques UICN
            </h3>
            <p className="font-serif text-sm sm:text-base text-[var(--color-ink)]">
              {assessors}
              {yearPublished && (
                <span className="text-xs font-sans text-[var(--color-ink-muted)] ml-2">
                  ({yearPublished})
                </span>
              )}
            </p>
          </div>
        )}

        {citation && (
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-xs uppercase tracking-wider text-[var(--color-ink-faint)]">
                Citation académique de référence
              </h3>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-xs text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors cursor-pointer"
                title="Copier la citation dans le presse-papier"
              >
                {copied ? (
                  <>
                    <Check className="size-3 text-emerald-600" />
                    <span className="text-emerald-600">Copié</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3" />
                    <span>Copier</span>
                  </>
                )}
              </button>
            </div>

            <blockquote className="border-l-2 border-[var(--color-paper-border-strong)] bg-[var(--color-paper-muted)]/30 p-4 font-serif text-xs sm:text-sm italic leading-relaxed text-[var(--color-ink-muted)]">
              {citation}
            </blockquote>
          </div>
        )}

        {officialUrl && (
          <div className="pt-4 border-t border-[var(--color-paper-border)]/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-[var(--color-ink-muted)]">
            <p>
              Source : Union Internationale pour la Conservation de la Nature
              (UICN).
            </p>
            <a
              href={officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-[var(--color-ink)] hover:underline"
            >
              <span>Consulter l&apos;évaluation sur iucnredlist.org</span>
              <ExternalLink className="size-3.5" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export { SpeciesCitation };
