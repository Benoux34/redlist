import { useMemo } from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { DOMAINS } from "@/components/gestures/utils";
import { THREATS } from "@/components/threats/utils";
import { ActionsHero } from "./actions-hero/ActionsHero";
import { CauseFilter } from "./cause-filter/CauseFilter";
import { GestureDomain } from "./gesture-domain/GestureDomain";
import { useCauseFilter } from "./hooks/useCauseFilter";
import { countByCause, countGestures, filterDomains } from "./utils";

const Actions = () => {
  const { cause, setCause } = useCauseFilter();

  const counts = useMemo(() => countByCause(DOMAINS), []);
  const visibleDomains = useMemo(() => filterDomains(DOMAINS, cause), [cause]);

  return (
    <div className="py-8 md:py-12">
      <ActionsHero
        gestureCount={countGestures(DOMAINS)}
        domainCount={DOMAINS.length}
        causeCount={THREATS.length}
      />

      <CauseFilter
        cause={cause}
        onCauseChange={setCause}
        counts={counts}
        total={countGestures(DOMAINS)}
      />

      {visibleDomains.map((domain) => (
        <GestureDomain
          key={`${cause ?? "all"}-${domain.label}`}
          domain={domain}
        />
      ))}

      <Link
        viewTransition
        to="/threatened-species"
        className="group mt-4 flex items-center justify-between gap-4 border border-[var(--color-paper-border)] bg-[var(--color-paper-muted)]/30 px-6 py-5 text-left transition-colors hover:bg-[var(--color-paper-muted)] sm:px-7"
      >
        <span>
          <span className="block font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-faint)]">
            Et maintenant
          </span>
          <span className="font-serif text-xl text-[var(--color-ink)]">
            Découvrir les espèces que ces gestes protègent
          </span>
        </span>
        <ArrowRight
          className="size-5 shrink-0 text-[var(--color-ink-muted)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--color-ink)] motion-reduce:transition-none"
          aria-hidden="true"
        />
      </Link>
    </div>
  );
};

export default Actions;
