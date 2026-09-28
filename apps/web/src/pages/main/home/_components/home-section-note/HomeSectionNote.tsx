import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";

type Props = Readonly<{
  children: ReactNode;
  sourceLabel: string;
  sourceHref: string;
}>;

const HomeSectionNote = ({ children, sourceLabel, sourceHref }: Props) => {
  return (
    <div className="mt-1.5 flex flex-col gap-1 text-[11px] text-[var(--color-ink-faint)] sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <p>{children}</p>

      <a
        href={sourceHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0 items-center gap-1 transition-colors hover:text-[var(--color-ink)] hover:underline"
      >
        <span>{sourceLabel}</span>
        <ExternalLink className="size-3" aria-hidden="true" />
      </a>
    </div>
  );
};

export { HomeSectionNote };
