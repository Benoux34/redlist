import type { ConservationAction } from "@app/contracts";

type Props = Readonly<{
  actions: ConservationAction[];
}>;

const SpeciesConservation = ({ actions }: Props) => {
  if (actions.length === 0) return null;

  return (
    <section className="mb-10">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 border-b border-[var(--color-paper-border)] pb-2.5">
        <p className="text-sm font-medium tracking-wide text-[var(--color-ink-muted)]">
          Actions & Mesures de conservation en place
        </p>
        <span className="text-xs text-[var(--color-ink-faint)] italic">
          Nomenclature officielle UICN (anglais)
        </span>
      </div>

      <div className="border border-[var(--color-paper-border)] divide-y divide-[var(--color-paper-border)] bg-transparent">
        {actions.map((actionGroup) => (
          <div key={actionGroup.group} className="p-5 sm:p-6 text-left">
            <h3 className="font-serif text-base sm:text-lg font-medium text-[var(--color-ink)] mb-3">
              {actionGroup.group}
            </h3>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs sm:text-sm text-[var(--color-ink-muted)]">
              {actionGroup.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[var(--color-ink-faint)] mt-0.5">•</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export { SpeciesConservation };
