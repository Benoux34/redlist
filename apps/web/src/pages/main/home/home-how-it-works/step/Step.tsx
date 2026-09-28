import type { ReactNode } from "react";
import type { HowStep } from "./entities";

type Props = Readonly<{
  step: HowStep;
  highlighted?: boolean;
  children?: ReactNode;
}>;

const Step = ({ step, highlighted = false, children }: Props) => {
  const Icon = step.icon;

  return (
    <div
      className={`relative flex h-full flex-col gap-4 overflow-hidden p-6 transition-colors duration-300 sm:p-7 ${
        highlighted ? "" : "group-hover:bg-[var(--color-paper-muted)]"
      }`}
    >
      <span
        className="absolute left-0 top-0 h-0.5 w-0 bg-[var(--color-status-cr)] transition-[width] duration-500 ease-out group-hover:w-full motion-reduce:transition-none"
        aria-hidden="true"
      />

      <span
        className={`inline-flex size-11 items-center justify-center border transition-colors duration-300 ${
          highlighted
            ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)]"
            : "border-[var(--color-paper-border-strong)] bg-[var(--color-paper-card)] text-[var(--color-ink)] group-hover:border-[var(--color-ink)] group-hover:bg-[var(--color-ink)] group-hover:text-[var(--color-paper)]"
        }`}
      >
        <Icon
          className="size-5 transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </span>

      <div>
        <p className="mb-1 font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-faint)]">
          Étape {step.number}
        </p>
        <h3 className="mb-2 font-serif text-xl font-medium tracking-tight text-[var(--color-ink)]">
          {step.title}
        </h3>
        <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">
          {step.description}
        </p>
      </div>

      {children}
    </div>
  );
};

export { Step };
