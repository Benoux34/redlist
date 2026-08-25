import type { SpeciesGroup } from "@app/contracts";
import { Prisma } from "../../generated/prisma/client";

type GroupDefinition = {
  classNames?: string[];
  kingdom?: string;
};

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

function groupWhere(
  group: SpeciesGroup | undefined,
): Prisma.RedListAssessmentWhereInput {
  if (group === undefined) return {};

  const definition = GROUPS[group];

  if (definition.kingdom !== undefined) return { kingdom: definition.kingdom };

  if (definition.classNames !== undefined)
    return { className: { in: definition.classNames } };

  return {};
}

function classNamesOf(group: SpeciesGroup): string[] {
  return GROUPS[group].classNames ?? [];
}

const GROUP_KEYS = Object.keys(GROUPS) as SpeciesGroup[];

export { groupWhere, classNamesOf, GROUP_KEYS };
