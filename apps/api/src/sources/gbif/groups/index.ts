import type { SpeciesGroup } from "@app/contracts";
import { Prisma } from "@/generated/prisma/client";
import { GROUPS, GROUP_KEYS, classNamesOf } from "./utils";

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

export { groupWhere, classNamesOf, GROUP_KEYS, GROUPS };
