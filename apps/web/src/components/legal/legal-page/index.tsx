import type { ReactNode } from "react";

type Props = Readonly<{
  title: string;
  lede: string;
  updatedAt: string;
  children: ReactNode;
}>;

const LegalPage = ({ title, lede, updatedAt, children }: Props) => {
  return (
    <div className="py-8 md:py-12">
      <header className="mb-12 text-left">
        <h1 className="mb-4 font-serif text-4xl font-medium tracking-tight text-[var(--color-ink)] md:text-5xl">
          {title}
        </h1>
        <p className="mb-6 text-base leading-relaxed text-[var(--color-ink-muted)] sm:text-lg">
          {lede}
        </p>
        <p className="font-mono text-xs text-[var(--color-ink-faint)]">
          Dernière mise à jour : {updatedAt}
        </p>
      </header>

      <div className="space-y-10">{children}</div>
    </div>
  );
};

export { LegalPage };
