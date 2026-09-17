import type { ThreatKey } from "@/components/threats/entities";
import { THREATS } from "@/components/threats/utils";
import {
  PILL_CLASS,
  PILL_IDLE,
  PILL_SELECTED,
} from "@/components/species-filters/utils";

type Props = Readonly<{
  cause: ThreatKey | null;
  onCauseChange: (cause: ThreatKey | null) => void;
  counts: Record<ThreatKey, number>;
  total: number;
}>;

const CauseFilter = ({ cause, onCauseChange, counts, total }: Props) => {
  return (
    <div className="mb-10 flex flex-col gap-3 border-b border-[var(--color-paper-border)] pb-5">
      <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-faint)]">
        Filtrer par cause
      </p>

      <div className="flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          onClick={() => onCauseChange(null)}
          aria-pressed={cause === null}
          className={`${PILL_CLASS} ${cause === null ? PILL_SELECTED : PILL_IDLE}`}
        >
          <span>Tous les gestes</span>
          <span className="font-mono text-[10px] opacity-70">{total}</span>
        </button>

        {THREATS.filter((threat) => counts[threat.key] > 0).map((threat) => {
          const Icon = threat.icon;
          const isSelected = cause === threat.key;

          return (
            <button
              key={threat.key}
              type="button"
              onClick={() => onCauseChange(isSelected ? null : threat.key)}
              aria-pressed={isSelected}
              className={`${PILL_CLASS} ${isSelected ? PILL_SELECTED : PILL_IDLE}`}
            >
              <Icon className="size-3.5" aria-hidden="true" />
              <span>{threat.title}</span>
              <span className="font-mono text-[10px] opacity-70">
                {counts[threat.key]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export { CauseFilter };
