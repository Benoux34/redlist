import type {
  SpeciesThreats,
  ThreatCause,
  ThreatImpact,
} from "@app/contracts";
import type { RawThreat } from "../entities";
import {
  CAUSE_BY_FAMILY,
  CAUSE_ORDER,
  IMPACT_BY_LABEL,
  IMPACT_LABELS,
  IMPACT_LEVELS,
  IMPACT_RANK,
  SCOPE_LABELS,
  SEVERITY_LABELS,
  THREAT_LABELS,
  TIMING_LABELS,
} from "./utils";

function impactOf(threat: RawThreat): ThreatImpact {
  return IMPACT_BY_LABEL[threat.impactLabel ?? ""] ?? "unknown";
}

function threatLabel(threat: RawThreat): string {
  const subCode = threat.code?.split("_").slice(0, 2).join("_") ?? "";

  return THREAT_LABELS[subCode] ?? threat.label;
}

function isStronger(a: RawThreat, b: RawThreat): boolean {
  const rankA = IMPACT_RANK[impactOf(a)];
  const rankB = IMPACT_RANK[impactOf(b)];

  return rankA > rankB || (rankA === rankB && (a.impactScore ?? 0) > (b.impactScore ?? 0));
}

function buildThreats(threats: readonly RawThreat[]): SpeciesThreats {
  const byCause = new Map<ThreatCause, RawThreat[]>();

  for (const threat of threats) {
    const cause = CAUSE_BY_FAMILY[threat.code?.split("_")[0] ?? ""] ?? "other";
    byCause.set(cause, [...(byCause.get(cause) ?? []), threat]);
  }

  const groups = [...byCause.entries()]
    .map(([cause, items]) => ({
      cause,
      strongest: items.reduce((best, item) => (isStronger(item, best) ? item : best)),
      count: items.length,
      labels: [...new Set(items.map(threatLabel))],
    }))
    .sort(
      (a, b) =>
        IMPACT_RANK[impactOf(b.strongest)] - IMPACT_RANK[impactOf(a.strongest)] ||
        (b.strongest.impactScore ?? 0) - (a.strongest.impactScore ?? 0) ||
        b.count - a.count ||
        CAUSE_ORDER.indexOf(a.cause) - CAUSE_ORDER.indexOf(b.cause),
    )
    .map(({ cause, strongest, labels }) => {
      const impact = impactOf(strongest);

      return {
        cause,
        impact,
        impactLabel: IMPACT_LABELS[impact],
        impactLevel: IMPACT_LEVELS[impact],
        labels,
      };
    });

  const items = [...threats]
    .sort((a, b) => (isStronger(a, b) ? -1 : isStronger(b, a) ? 1 : 0))
    .map((threat) => ({
    label: threatLabel(threat),
    originalLabel: threat.label,
    impactLabel: IMPACT_LABELS[impactOf(threat)],
    scope: threat.scope === null ? null : (SCOPE_LABELS[threat.scope] ?? null),
    severity: threat.severity === null ? null : (SEVERITY_LABELS[threat.severity] ?? null),
    timing: threat.timing === null ? null : (TIMING_LABELS[threat.timing] ?? null),
  }));

  return { groups, items };
}

export { buildThreats };
