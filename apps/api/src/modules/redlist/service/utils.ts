import type {
  CountryCategoryCounts,
  GroupCountsQuery,
  RedListCountryCounts,
  RedListQuery,
} from "@app/contracts";
import { Prisma } from "@/generated/prisma/client";
import { groupWhere } from "../groups";

const PAGE_SIZE = 42;
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

type CountryCategoryRow = Readonly<{
  countryCode: string;
  categoryCode: string;
  count: number;
}>;

const EMPTY_COUNTS: CountryCategoryCounts = {
  EX: 0,
  EW: 0,
  CR: 0,
  EN: 0,
  VU: 0,
};

const THREATENED_CODES = ["CR", "EN", "VU"] as const;

function buildCountryCounts(
  rows: readonly CountryCategoryRow[],
): RedListCountryCounts {
  const byCountry = new Map<string, CountryCategoryCounts>();

  for (const row of rows) {
    const code = row.countryCode.toUpperCase();
    const counts = byCountry.get(code) ?? { ...EMPTY_COUNTS };

    if (row.categoryCode in counts)
      counts[row.categoryCode as keyof CountryCategoryCounts] = row.count;

    byCountry.set(code, counts);
  }

  const totals = [...byCountry.entries()].map(([countryCode, counts]) => ({
    countryCode,
    counts,
    threatened: THREATENED_CODES.reduce((sum, code) => sum + counts[code], 0),
  }));

  totals.sort(
    (a, b) =>
      b.threatened - a.threatened ||
      a.countryCode.localeCompare(b.countryCode),
  );

  let rank = 0;
  let previous: number | null = null;

  return totals.map((entry, index) => {
    if (entry.threatened !== previous) {
      rank = index + 1;
      previous = entry.threatened;
    }

    return { ...entry, rank };
  });
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
  buildCountryCounts,
  EMPTY_COUNTS,
};

export type { CountryCategoryRow };
