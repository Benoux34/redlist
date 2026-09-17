import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { collapsibleClass } from "@/lib/utils";

type Props = Readonly<{
  title: string;
  hint: string;
  children: ReactNode;
}>;

const FurtherItem = ({ title, hint, children }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const id = useId();

  return (
    <li className="group">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls={id}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-[var(--color-paper-muted)]/40 sm:px-7"
      >
        <span>
          <span className="block font-serif text-xl font-medium tracking-tight text-[var(--color-ink)]">
            {title}
          </span>
          <span className="mt-0.5 block text-xs text-[var(--color-ink-muted)]">
            {hint}
          </span>
        </span>
        <span
          className={`inline-flex size-8 shrink-0 items-center justify-center border border-[var(--color-paper-border)] transition-all duration-300 group-hover:border-[var(--color-ink)] ${isOpen ? "rotate-180 bg-[var(--color-ink)] text-[var(--color-paper)]" : "text-[var(--color-ink)]"}`}
          aria-hidden="true"
        >
          <ChevronDown className="size-4" />
        </span>
      </button>

      <div id={id} inert={!isOpen} className={collapsibleClass(isOpen)}>
        <div className="min-h-0 overflow-hidden">
          <div className="px-6 pb-6 sm:px-7">{children}</div>
        </div>
      </div>
    </li>
  );
};

export { FurtherItem };
