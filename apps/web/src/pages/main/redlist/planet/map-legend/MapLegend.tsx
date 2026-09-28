import type { ScaleStep, MapFilters } from "../entities";
import { NO_DATA_COLOR, numberFr } from "../utils";
import { FilterSentence } from "./FilterSentence";

const SWATCH_LABEL =
  "font-mono text-[10px] tabular-nums text-[var(--color-ink-faint)]";

type Props = Readonly<{
  filters: MapFilters;
  scale: readonly ScaleStep[];
}>;

const MapLegend = ({ filters, scale }: Props) => {
  return (
    <div className="flex flex-col divide-y divide-[var(--color-paper-border)] border border-[var(--color-paper-border)]">
      <div className="px-5 py-4">
        <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-faint)]">
          Comment lire la carte
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-ink-muted)]">
          <FilterSentence filters={filters} /> Plus le rouge est foncé, plus
          elles sont nombreuses ; les tranches s&apos;ajustent aux filtres
          choisis. Survolez un pays pour voir son chiffre, cliquez pour
          découvrir ses espèces.
        </p>
      </div>

      <div className="flex flex-col gap-4 px-5 py-4 md:flex-row md:items-end md:gap-8">
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <span className="text-xs text-[var(--color-ink-muted)]">
            Nombre d&apos;espèces par pays
          </span>
          <div className="flex">
            {scale.map((step, i) => {
              const next = scale[i + 1];

              return (
                <div
                  key={step.min}
                  className="flex min-w-0 flex-1 flex-col gap-1"
                >
                  <span
                    className="block h-3 w-full"
                    style={{ backgroundColor: step.color }}
                  />
                  <span className={SWATCH_LABEL}>
                    {next === undefined
                      ? `${numberFr.format(step.min)}+`
                      : next.min - 1 === step.min
                        ? numberFr.format(step.min)
                        : `${numberFr.format(step.min)}–${numberFr.format(next.min - 1)}`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-x-5 gap-y-1.5 text-xs text-[var(--color-ink-muted)] md:flex-col">
          <span className="flex items-center gap-2">
            <span
              className="block size-3 border border-[var(--color-paper-border-strong)]"
              style={{ backgroundColor: NO_DATA_COLOR }}
            />
            Aucune espèce recensée
          </span>
          <span className="flex items-center gap-2">
            <span className="block size-3 rounded-full border border-[var(--color-paper-border-strong)] bg-[var(--color-status-cr-border)]" />
            Île ou petit territoire
          </span>
        </div>
      </div>
    </div>
  );
};

export { MapLegend };
