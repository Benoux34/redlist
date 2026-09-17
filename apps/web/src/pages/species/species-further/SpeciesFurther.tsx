import { useState } from "react";
import type { RedListDetail } from "@app/contracts";
import { Check, Copy, ExternalLink } from "lucide-react";
import { HomeSectionHeader } from "@/pages/home/_components/home-section-header/HomeSectionHeader";
import { FurtherItem } from "./further-item/FurtherItem";

type Props = Readonly<{
  species: RedListDetail;
}>;

const COPIED_MS = 2000;

const SpeciesFurther = ({ species }: Props) => {
  const [copied, setCopied] = useState<boolean>(false);
  const { texts } = species;
  const { ladder } = species.taxonomy;

  const copyCitation = () => {
    if (species.citation === null) return;

    void navigator.clipboard.writeText(species.citation).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), COPIED_MS);
    });
  };

  if (texts.length === 0 && ladder.length === 0 && species.citation === null)
    return null;

  return (
    <section id="details" className="mb-10 scroll-mt-24 text-left">
      <HomeSectionHeader
        eyebrow="Pour aller plus loin"
        title="Les détails de l'évaluation"
        lede="Les sources complètes, pour ceux qui veulent creuser."
      />

      <ul className="divide-y divide-[var(--color-paper-border)] border border-[var(--color-paper-border)]">
        {texts.length > 0 && (
          <FurtherItem
            title="Textes de l'UICN"
            hint={`${texts.length} chapitres · texte original en anglais`}
          >
            <div lang="en" className="flex flex-col gap-6">
              {texts.map((text) => (
                <div key={text.title}>
                  <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-faint)]">
                    {text.title}
                  </p>
                  <div className="flex max-w-3xl flex-col gap-3 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                    {text.paragraphs.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FurtherItem>
        )}

        {ladder.length > 0 && (
          <FurtherItem
            title="Classification"
            hint="Sa place dans l'arbre du vivant"
          >
            <ol className="flex flex-col">
              {ladder.map((rung, i) => (
                <li key={rung.rank} className="flex items-stretch gap-4">
                  <span
                    className="flex w-3 flex-col items-center"
                    aria-hidden="true"
                  >
                    <span
                      className={`mt-1.5 size-3 shrink-0 rounded-full border-2 ${i === ladder.length - 1 ? "border-[var(--color-status-cr)] bg-[var(--color-status-cr)]" : "border-[var(--color-ink-muted)] bg-[var(--color-paper)]"}`}
                    />
                    {i < ladder.length - 1 && (
                      <span className="w-px flex-1 bg-[var(--color-paper-border-strong)]" />
                    )}
                  </span>
                  <div className="pb-4">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-faint)]">
                      {rung.rank}
                    </p>
                    <p className="font-serif text-base text-[var(--color-ink)]">
                      <span className={rung.rank === "Espèce" ? "italic" : ""}>
                        {rung.name}
                      </span>
                      {rung.french && (
                        <span className="ml-2 font-sans text-xs text-[var(--color-ink-muted)]">
                          {rung.french}
                        </span>
                      )}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </FurtherItem>
        )}

        {species.citation !== null && (
          <FurtherItem
            title="Citer cette évaluation"
            hint="Référence officielle de l'UICN"
          >
            <div className="flex flex-col gap-4">
              {species.assessors && (
                <p className="text-xs text-[var(--color-ink-muted)]">
                  <span className="font-mono uppercase tracking-wider text-[var(--color-ink-faint)]">
                    Évaluateurs ·{" "}
                  </span>
                  {species.assessors}
                </p>
              )}

              <blockquote
                lang="en"
                className="border-l-2 border-[var(--color-status-cr)] bg-[var(--color-paper-muted)]/40 px-4 py-3 font-mono text-xs leading-relaxed text-[var(--color-ink)]"
              >
                {species.citation}
              </blockquote>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={copyCitation}
                  className="inline-flex cursor-pointer items-center gap-1.5 border border-[var(--color-paper-border-strong)] px-3 py-1.5 text-xs text-[var(--color-ink)] transition-colors hover:bg-[var(--color-paper-muted)]"
                >
                  {copied ? (
                    <Check className="size-3.5 text-[var(--color-status-cr)]" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                  <span aria-live="polite">
                    {copied ? "Copiée" : "Copier la citation"}
                  </span>
                </button>

                {species.officialUrl && (
                  <a
                    href={species.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)]"
                  >
                    <span>Fiche officielle UICN</span>
                    <ExternalLink className="size-3" />
                  </a>
                )}
              </div>
            </div>
          </FurtherItem>
        )}
      </ul>
    </section>
  );
};

export { SpeciesFurther };
