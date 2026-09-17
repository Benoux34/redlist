type Props = Readonly<{
  gestureCount: number;
  domainCount: number;
  causeCount: number;
}>;

const ActionsHero = ({ gestureCount, domainCount, causeCount }: Props) => {
  return (
    <section className="mt-8 mb-12 text-left">
      <h1 className="mb-6 font-serif text-4xl leading-[1.08] tracking-tight text-[var(--color-ink)] sm:text-6xl lg:text-7xl">
        Chaque geste{" "}
        <span className="italic font-normal underline decoration-[var(--color-paper-border-strong)] decoration-2 underline-offset-8">
          compte
        </span>
        .
      </h1>

      <p className="mb-8 max-w-4xl text-base leading-relaxed text-[var(--color-ink-muted)] sm:text-xl">
        Les grandes causes du déclin du vivant se jouent aussi dans nos
        habitudes. Voici des gestes simples, sans jargon, rangés selon les
        moments du quotidien où ils se glissent.
      </p>

      <dl className="flex flex-wrap border border-[var(--color-paper-border)]">
        {[
          { value: gestureCount, label: "gestes à portée de main" },
          { value: domainCount, label: "moments du quotidien" },
          { value: causeCount, label: "causes de déclin ciblées" },
        ].map((stat, index) => (
          <div
            key={stat.label}
            className={`flex flex-1 basis-40 flex-col gap-1 px-5 py-4 ${
              index > 0
                ? "border-t border-[var(--color-paper-border)] sm:border-l sm:border-t-0"
                : ""
            }`}
          >
            <dt className="order-2 font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-faint)]">
              {stat.label}
            </dt>
            <dd className="order-1 font-serif text-3xl font-medium tabular-nums text-[var(--color-ink)]">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export { ActionsHero };
