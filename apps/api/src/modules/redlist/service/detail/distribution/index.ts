import type { PresenceKind, SpeciesDistribution } from "@app/contracts";
import type { RawHabitat, RawLocation } from "../entities";
import {
  COUNTRY_CODE,
  HABITAT_LABELS,
  PRESENCE_BY_LABEL,
  PRESENCE_LABELS,
  PRESENCE_ORDER,
  regionNames,
} from "./utils";

function countryName(code: string, fallback: string): string {
  try {
    return regionNames.of(code) ?? fallback;
  } catch {
    return fallback;
  }
}

function buildDistribution(
  locations: readonly RawLocation[],
  habitats: readonly RawHabitat[],
): SpeciesDistribution {
  const byCode = new Map<
    string,
    { code: string; name: string; introduced: boolean; presence: PresenceKind }
  >();

  for (const location of locations) {
    const code = location.code?.toUpperCase() ?? "";
    if (!COUNTRY_CODE.test(code)) continue;

    const presence = PRESENCE_BY_LABEL[location.presence ?? ""] ?? "current";
    const existing = byCode.get(code);

    if (
      existing === undefined ||
      PRESENCE_ORDER.indexOf(presence) < PRESENCE_ORDER.indexOf(existing.presence)
    )
      byCode.set(code, {
        code,
        name: countryName(code, location.name),
        introduced: location.origin === "Introduced",
        presence,
      });
  }

  const countries = [...byCode.values()].sort((a, b) =>
    a.name.localeCompare(b.name, "fr"),
  );

  const presence = PRESENCE_ORDER.map((kind) => ({
    presence: kind,
    label: PRESENCE_LABELS[kind],
    countries: countries
      .filter((country) => country.presence === kind)
      .map(({ code, name, introduced }) => ({ code, name, introduced })),
  })).filter((group) => group.countries.length > 0);

  const sortedHabitats = [...habitats].sort(
    (a, b) =>
      Number(b.suitability === "Suitable") - Number(a.suitability === "Suitable"),
  );

  return {
    presence,
    habitats: [
      ...new Set(
        sortedHabitats.flatMap((habitat) => {
          const label = HABITAT_LABELS[habitat.code?.split("_")[0] ?? ""];
          return label === undefined ? [] : [label];
        }),
      ),
    ],
  };
}

export { buildDistribution };
