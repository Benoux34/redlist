import {
  CHOROPLETH_STEPS,
  NO_DATA_COLOR,
  numberFr,
} from "../country-panel/utils";

const GlobeLegend = () => {
  const steps = [...CHOROPLETH_STEPS].reverse();
  const lowest = steps[0]?.min ?? 1;
  const highest = steps[steps.length - 1]?.min ?? 1;

  return (
    <div className="pointer-events-none absolute bottom-4 right-4 flex flex-col gap-1.5 border border-[var(--color-paper-border)] bg-[var(--color-paper)]/85 px-3 py-2.5 backdrop-blur-sm">
      <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-ink-faint)]">
        Espèces menacées
      </p>

      <div className="flex items-center gap-2">
        <span className="font-mono text-[10px] tabular-nums text-[var(--color-ink-faint)]">
          {numberFr.format(lowest)}
        </span>
        <div className="flex">
          {steps.map((step) => (
            <span
              key={step.min}
              className="block h-2.5 w-6"
              style={{ backgroundColor: step.color }}
            />
          ))}
        </div>
        <span className="font-mono text-[10px] tabular-nums text-[var(--color-ink-faint)]">
          {numberFr.format(highest)}+
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <span
          className="block size-2.5 border border-[var(--color-paper-border)]"
          style={{ backgroundColor: NO_DATA_COLOR }}
        />
        <span className="text-[10px] text-[var(--color-ink-faint)]">
          Sans donnée
        </span>
      </div>
    </div>
  );
};

export { GlobeLegend };
