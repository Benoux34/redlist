import type { ReactNode } from "react";

type FieldProps = Readonly<{
  label: string;
  children: ReactNode;
}>;

const LegalField = ({ label, children }: FieldProps) => {
  return (
    <div className="grid grid-cols-1 gap-1 border-b border-[var(--color-paper-border)]/70 py-2.5 sm:grid-cols-[200px_1fr] sm:gap-4">
      <dt className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-faint)]">
        {label}
      </dt>
      <dd className="text-sm text-[var(--color-ink)]">{children}</dd>
    </div>
  );
};

export { LegalField };
