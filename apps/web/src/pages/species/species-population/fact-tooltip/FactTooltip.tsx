import { useId } from "react";
import { Info } from "lucide-react";

type Props = Readonly<{
  text: string;
}>;

const FactTooltip = ({ text }: Props) => {
  const id = useId();

  return (
    <span className="group/tooltip relative inline-flex align-middle">
      <button
        type="button"
        aria-describedby={id}
        aria-label="Pourquoi c'est important"
        className="inline-flex size-5 cursor-help items-center justify-center text-[var(--color-ink-faint)] transition-colors hover:text-[var(--color-ink)] focus-visible:text-[var(--color-ink)] focus-visible:outline-none"
      >
        <Info className="size-3.5" />
      </button>
      <span
        id={id}
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-64 -translate-x-1/2 translate-y-1 border border-[var(--color-paper-border)] bg-[var(--color-paper)] px-3 py-2 text-xs leading-relaxed text-[var(--color-ink-muted)] opacity-0 shadow-sm transition-all duration-200 group-focus-within/tooltip:translate-y-0 group-focus-within/tooltip:opacity-100 group-hover/tooltip:translate-y-0 group-hover/tooltip:opacity-100"
      >
        {text}
      </span>
    </span>
  );
};

export { FactTooltip };
