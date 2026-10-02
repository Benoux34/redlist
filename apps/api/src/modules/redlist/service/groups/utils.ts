import type { SpeciesGroup } from "@app/contracts";
import type { GroupDefinition } from "./entities";

const GROUPS: Record<SpeciesGroup, GroupDefinition> = {
  mammiferes: { classNames: ["Mammalia"] },
  oiseaux: { classNames: ["Aves"] },
  reptiles: { classNames: ["Reptilia", "Squamata", "Testudines"] },
  amphibiens: { classNames: ["Amphibia"] },
  poissons: {
    classNames: [
      "Actinopterygii",
      "Chondrichthyes",
      "Sarcopterygii",
      "Elasmobranchii",
      "Myxini",
      "Petromyzonti",
    ],
  },
  insectes: { classNames: ["Insecta"] },
  mollusques: { classNames: ["Gastropoda", "Bivalvia", "Cephalopoda"] },
  plantes: { kingdom: "Plantae" },
};

const GROUP_KEYS = Object.keys(GROUPS) as SpeciesGroup[];

function classNamesOf(group: SpeciesGroup): string[] {
  return GROUPS[group].classNames ?? [];
}

export { GROUPS, GROUP_KEYS, classNamesOf };
