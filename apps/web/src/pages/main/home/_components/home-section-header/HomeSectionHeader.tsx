type Props = Readonly<{
  eyebrow: string;
  title: string;
  lede?: string;
}>;

const HomeSectionHeader = ({ eyebrow, title, lede }: Props) => {
  return (
    <div className="mb-6 max-w-3xl">
      <p className="mb-3 font-mono text-xs uppercase tracking-wider text-[var(--color-ink-faint)]">
        {eyebrow}
      </p>
      <h2 className="text-balance font-serif text-3xl font-medium tracking-tight text-[var(--color-ink)] sm:text-4xl">
        {title}
      </h2>
      {lede !== undefined && (
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-muted)] sm:text-base">
          {lede}
        </p>
      )}
    </div>
  );
};

export { HomeSectionHeader };
