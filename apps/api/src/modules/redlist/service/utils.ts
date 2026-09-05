import type { GroupCountsQuery, RedListQuery } from "@app/contracts";
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

function scopeWhere(
  scope: GroupCountsQuery,
): Prisma.RedListAssessmentWhereInput {
  return {
    ...(scope.letter === undefined
      ? {}
      : { scientificName: { startsWith: scope.letter, mode: "insensitive" } }),
    ...(scope.countryCode === undefined
      ? {}
      : { locations: { some: { countryCode: scope.countryCode } } }),
    ...(scope.possiblyExtinct === true ? { possiblyExtinct: true } : {}),
  };
}

const SCOPE_KEY_SEPARATOR = "|";

function scopeKey(scope: GroupCountsQuery): string {
  return [
    scope.letter ?? "",
    scope.countryCode ?? "",
    scope.possiblyExtinct === true ? "1" : "",
  ].join(SCOPE_KEY_SEPARATOR);
}

function parseScopeKey(key: string): GroupCountsQuery {
  const [letter, countryCode, possiblyExtinct] = key.split(SCOPE_KEY_SEPARATOR);

  return {
    ...(letter === undefined || letter === "" ? {} : { letter }),
    ...(countryCode === undefined || countryCode === "" ? {} : { countryCode }),
    ...(possiblyExtinct === "1" ? { possiblyExtinct: true } : {}),
  };
}

function buildWhere(query: RedListQuery): Prisma.RedListAssessmentWhereInput {
  return {
    ...(query.category ? { categoryCode: query.category } : {}),
    ...groupWhere(query.group),
    ...(query.withPhoto === true ? { photoUrl: { not: null } } : {}),
    ...scopeWhere(query),
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
  scopeWhere,
  scopeKey,
  parseScopeKey,
  buildWhere,
  buildOrderBy,
};
