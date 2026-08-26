import type { RedListQuery } from "@app/contracts";
import { Prisma } from "@/generated/prisma/client";
import { groupWhere } from "../groups";

const PAGE_SIZE = 40;
const MS_PER_DAY = 86_400_000;
const EMPTY_RESOLVED = null;

const SELECT = {
  assessmentId: true,
  scientificName: true,
  vernacularNameFr: true,
  categoryCode: true,
  description: true,
  descriptionSource: true,
  photoUrl: true,
  photoAttribution: true,
  photoLicense: true,
  yearPublished: true,
  possiblyExtinct: true,
  officialUrl: true,
} as const;

const DETAIL_SELECT = {
  ...SELECT,
  detail: true,
  detailFetchedAt: true,
} as const;

function buildWhere(query: RedListQuery): Prisma.RedListAssessmentWhereInput {
  return {
    ...(query.category ? { categoryCode: query.category } : {}),
    ...groupWhere(query.group),
    ...(query.withPhoto === true ? { photoUrl: { not: null } } : {}),
    ...(query.possiblyExtinct === true ? { possiblyExtinct: true } : {}),
    ...(query.letter
      ? { scientificName: { startsWith: query.letter, mode: "insensitive" } }
      : {}),
    ...(query.countryCode
      ? { locations: { some: { countryCode: query.countryCode } } }
      : {}),
    ...(query.search
      ? {
          OR: [
            { scientificName: { contains: query.search, mode: "insensitive" } },
            {
              vernacularNameFr: {
                contains: query.search,
                mode: "insensitive",
              },
            },
          ],
        }
      : {}),
  };
}

function buildOrderBy(
  query: RedListQuery,
): Prisma.RedListAssessmentOrderByWithRelationInput[] {
  if (query.letter !== undefined) return [{ scientificName: "asc" }];

  return [
    { photoUrl: { sort: "asc", nulls: "last" } },
    { scientificName: "asc" },
  ];
}

export {
  PAGE_SIZE,
  MS_PER_DAY,
  EMPTY_RESOLVED,
  SELECT,
  DETAIL_SELECT,
  buildWhere,
  buildOrderBy,
};
