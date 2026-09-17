import { ExternalLink } from "lucide-react";
import { THREAT_LABELS } from "@/components/threats/utils";
import type { Gesture } from "../entities";

type Props = Readonly<{
  gesture: Gesture;
  domain?: string;
}>;

const GestureCard = ({ gesture, domain }: Props) => {
  const Icon = gesture.icon;

  return (
    <div className="relative flex h-full flex-col gap-4 overflow-hidden p-6 transition-colors duration-300 group-hover:bg-[var(--color-paper-muted)] sm:p-7">
      <span
        className="absolute left-0 top-0 h-0.5 w-0 bg-[var(--color-status-cr)] transition-[width] duration-500 ease-out group-hover:w-full motion-reduce:transition-none"
        aria-hidden="true"
      />

      <span className="inline-flex size-11 items-center justify-center border border-[var(--color-paper-border-strong)] bg-[var(--color-paper-card)] text-[var(--color-ink)] transition-colors duration-300 group-hover:border-[var(--color-ink)] group-hover:bg-[var(--color-ink)] group-hover:text-[var(--color-paper)]">
        <Icon
          className="size-5 transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </span>

      <div>
        {domain !== undefined && (
          <p className="mb-1 font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-faint)]">
            {domain}
          </p>
        )}
        <h3 className="mb-2 font-serif text-xl font-medium tracking-tight text-[var(--color-ink)]">
          {gesture.title}
        </h3>
        <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">
          {gesture.description}
        </p>
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-3">
        {gesture.threat !== null && (
          <span className="border border-[var(--color-paper-border)] px-2 py-0.5 text-[11px] text-[var(--color-ink-faint)] transition-colors duration-300 group-hover:border-[var(--color-status-cr-border)] group-hover:text-[var(--color-status-cr)]">
            Agit sur : {THREAT_LABELS[gesture.threat].toLowerCase()}
          </span>
        )}

        {gesture.href !== undefined && (
          <a
            href={gesture.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-[var(--color-ink)] underline underline-offset-4 transition-opacity hover:opacity-80"
          >
            <span>iNaturalist</span>
            <ExternalLink className="size-3" aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  );
};

export { GestureCard };
