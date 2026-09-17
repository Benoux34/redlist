import type { GestureDomain } from "../../components/gestures/entities";
import type { ThreatKey } from "../../components/threats/entities";
import { THREATS } from "../../components/threats/utils";

const CAUSE_PARAM = "cause";

const THREAT_KEYS = new Set<string>(THREATS.map((threat) => threat.key));

function parseCause(raw: string | null): ThreatKey | null {
  return raw !== null && THREAT_KEYS.has(raw) ? (raw as ThreatKey) : null;
}

function filterDomains(
  domains: readonly GestureDomain[],
  cause: ThreatKey | null,
): GestureDomain[] {
  if (cause === null) return [...domains];

  return domains.flatMap((domain) => {
    const gestures = domain.gestures.filter(
      (gesture) => gesture.threat === cause,
    );

    return gestures.length === 0 ? [] : [{ ...domain, gestures }];
  });
}

function countByCause(
  domains: readonly GestureDomain[],
): Record<ThreatKey, number> {
  const counts = Object.fromEntries(
    THREATS.map((threat) => [threat.key, 0]),
  ) as Record<ThreatKey, number>;

  for (const domain of domains)
    for (const gesture of domain.gestures)
      if (gesture.threat !== null) counts[gesture.threat] += 1;

  return counts;
}

function countGestures(domains: readonly GestureDomain[]): number {
  return domains.reduce((total, domain) => total + domain.gestures.length, 0);
}

export { CAUSE_PARAM, parseCause, filterDomains, countByCause, countGestures };
