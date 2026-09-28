import type { ReactNode } from "react";

type SectionProps = Readonly<{
  title: string;
  children: ReactNode;
}>;

const LegalSection = ({ title, children }: SectionProps) => {
  return (
    <section>
      <h2 className="mb-4 border-b border-[var(--color-paper-border)] pb-2.5 font-serif text-2xl font-medium tracking-tight text-[var(--color-ink)]">
        {title}
      </h2>
      <div className="space-y-4 text-sm leading-relaxed text-[var(--color-ink-muted)] [&_a]:text-[var(--color-ink)] [&_a]:underline [&_a]:underline-offset-4 [&_li]:leading-relaxed [&_strong]:font-medium [&_strong]:text-[var(--color-ink)] [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
};

export { LegalSection };
