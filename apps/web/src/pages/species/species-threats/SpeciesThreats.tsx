import type { SpeciesHabitat, SpeciesThreat } from "@app/contracts";
import {
  translateHabitatFamily,
  translateScope,
  translateSeverity,
  translateSuitability,
  translateThreatFamily,
  translateTiming,
} from "./utils";

type Props = Readonly<{
  threats: SpeciesThreat[];
  habitats: SpeciesHabitat[];
}>;

const SpeciesThreats = ({ threats, habitats }: Props) => {
  return (
    <section className="mb-10">
      <div className="mb-4 flex items-baseline justify-between border-b border-[var(--color-paper-border)] pb-2.5">
        <p className="text-sm font-medium tracking-wide text-[var(--color-ink-muted)]">
          Pressions & Écosystèmes • Menaces et Habitats
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-serif text-lg font-medium text-[var(--color-ink)]">
              Menaces identifiées
            </h2>
            <span className="text-xs text-[var(--color-ink-faint)]">
              {threats.length} {threats.length <= 1 ? "facteur" : "facteurs"}
            </span>
          </div>

          {threats.length === 0 ? (
            <div className="border border-[var(--color-paper-border)] p-6 text-center text-xs text-[var(--color-ink-faint)]">
              Aucune menace directe détaillée dans l&apos;évaluation.
            </div>
          ) : (
            <div className="divide-y divide-[var(--color-paper-border)] border border-[var(--color-paper-border)]">
              {threats.map((threat, index) => {
                const family = translateThreatFamily(threat.familyCode);
                const timing = translateTiming(threat.timing);
                const scope = translateScope(threat.scope);
                const severity = translateSeverity(threat.severity);

                return (
                  <div
                    key={`${threat.code ?? index}-${threat.label}`}
                    className="p-4 sm:p-5"
                  >
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-status-cr)]">
                        {family ??
                          (threat.code ? `Menace ${threat.code}` : "Menace")}
                      </span>

                      {threat.impactLabel && (
                        <span className="border border-[var(--color-paper-border)] px-2 py-0.5 text-[11px] text-[var(--color-ink-muted)]">
                          {threat.impactLabel}
                        </span>
                      )}
                    </div>

                    <p className="mb-3 font-serif text-sm sm:text-base font-medium leading-snug text-[var(--color-ink)]">
                      {threat.label}
                    </p>

                    <div className="flex flex-wrap gap-2 text-[11px] text-[var(--color-ink-muted)]">
                      {severity && (
                        <span className="border border-[var(--color-paper-border)]/60 bg-[var(--color-paper-muted)]/30 px-2 py-0.5">
                          {severity}
                        </span>
                      )}
                      {scope && (
                        <span className="border border-[var(--color-paper-border)]/60 bg-[var(--color-paper-muted)]/30 px-2 py-0.5">
                          {scope}
                        </span>
                      )}
                      {timing && (
                        <span className="border border-[var(--color-paper-border)]/60 bg-[var(--color-paper-muted)]/30 px-2 py-0.5">
                          {timing}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-serif text-lg font-medium text-[var(--color-ink)]">
              Habitats naturels
            </h2>
            <span className="text-xs text-[var(--color-ink-faint)]">
              {habitats.length} {habitats.length <= 1 ? "milieu" : "milieux"}
            </span>
          </div>

          {habitats.length === 0 ? (
            <div className="border border-[var(--color-paper-border)] p-6 text-center text-xs text-[var(--color-ink-faint)]">
              Aucun habitat documenté dans l&apos;évaluation.
            </div>
          ) : (
            <div className="divide-y divide-[var(--color-paper-border)] border border-[var(--color-paper-border)]">
              {habitats.map((habitat, index) => {
                const family = translateHabitatFamily(
                  habitat.familyCode,
                  habitat.group,
                );
                const suitability = translateSuitability(habitat.suitability);

                return (
                  <div
                    key={`${habitat.code ?? index}-${habitat.group}`}
                    className="flex items-center justify-between p-4 sm:p-5"
                  >
                    <div>
                      <h3 className="font-serif text-sm sm:text-base font-medium text-[var(--color-ink)] mb-0.5">
                        {family}
                      </h3>
                      {habitat.detail && (
                        <p className="text-xs text-[var(--color-ink-muted)]">
                          {habitat.detail}
                        </p>
                      )}
                    </div>

                    {suitability && (
                      <span className="border border-[var(--color-paper-border)] px-2.5 py-1 text-xs text-[var(--color-ink-muted)] shrink-0 ml-3">
                        {suitability}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export { SpeciesThreats };
