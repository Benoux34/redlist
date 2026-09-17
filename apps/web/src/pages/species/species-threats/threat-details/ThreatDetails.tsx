import { useState } from "react";
import type { SpeciesThreat } from "@app/contracts";
import { ChevronDown } from "lucide-react";
import { collapsibleClass } from "@/lib/utils";

type Props = Readonly<{
  threats: readonly SpeciesThreat[];
}>;

const HEAD =
  "px-4 py-2.5 text-left font-mono text-[11px] font-normal uppercase tracking-wider text-[var(--color-ink-faint)]";
const CELL = "px-4 py-3 align-top text-xs text-[var(--color-ink-muted)]";

const ThreatDetails = ({ threats }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="border-x border-b border-[var(--color-paper-border)]">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="threat-details"
        className="flex w-full cursor-pointer items-center justify-between gap-3 px-5 py-3 text-xs text-[var(--color-ink-muted)] transition-colors hover:bg-[var(--color-paper-muted)]/40 hover:text-[var(--color-ink)]"
      >
        <span>
          Voir le détail des {threats.length}{" "}
          {threats.length > 1 ? "menaces évaluées" : "menace évaluée"} par
          l&apos;UICN
        </span>
        <ChevronDown
          className={`size-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      <div
        id="threat-details"
        inert={!isOpen}
        className={collapsibleClass(isOpen)}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="overflow-x-auto border-t border-[var(--color-paper-border)]">
            <table className="w-full min-w-[640px] border-collapse">
              <thead className="bg-[var(--color-paper-muted)]/40">
                <tr>
                  <th className={HEAD}>Menace</th>
                  <th className={HEAD}>Impact</th>
                  <th className={HEAD}>Part de la population touchée</th>
                  <th className={HEAD}>Effet</th>
                  <th className={HEAD}>Période</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-paper-border)]">
                {threats.map((threat, i) => (
                  <tr key={`${threat.originalLabel}-${i}`}>
                    <td className={`${CELL} text-[var(--color-ink)]`}>
                      {threat.label}
                      <span className="mt-0.5 block text-[11px] text-[var(--color-ink-faint)]">
                        {threat.originalLabel}
                      </span>
                    </td>
                    <td className={CELL}>{threat.impactLabel}</td>
                    <td className={CELL}>{threat.scope ?? "—"}</td>
                    <td className={CELL}>{threat.severity ?? "—"}</td>
                    <td className={CELL}>{threat.timing ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ThreatDetails };
