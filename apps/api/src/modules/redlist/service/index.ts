import type {
  CountryCountsQuery,
  GroupCountsQuery,
  RedListDetail,
  RedListItem,
  RedListPage,
  RedListQuery,
  SpeciesGroup,
} from "@app/contracts";
import type { CountryCategoryRow } from "./utils";
import {
  groupCounts,
  redListDetail,
  redListItem,
  redListPage,
} from "@app/contracts";
import { db } from "@/db";
import { Prisma } from "@/generated/prisma/client";
import { AppError, cached, cachedBy } from "@/lib";
import { aliasFor } from "@/sources/gbif";
import { EMPTY_DETAIL, fetchDetailWithinDeadline, mapDetail } from "../detail";
import { FEATURED_NAMES, orderFeatured, pickForDay } from "../featured";
import {
  buildCountryCounts,
  buildOrderBy,
  buildWhere,
  DETAIL_SELECT,
  EMPTY_RESOLVED,
  MS_PER_DAY,
  PAGE_SIZE,
  parseScopeKey,
  scopeKey,
  scopeWhere,
  SELECT,
} from "./utils";
import { GROUPS, GROUP_KEYS, groupWhere } from "../groups";

async function runQuery(query: RedListQuery): Promise<RedListPage> {
  const where = buildWhere(query);

  const [rows, total, sync] = await Promise.all([
    db.redListAssessment.findMany({
      where,
      select: SELECT,
      orderBy: buildOrderBy(query),
      skip: (query.page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    db.redListAssessment.count({ where }),
    db.redListSync.findUnique({ where: { id: "singleton" } }),
  ]);

  return redListPage.parse({
    items: rows,
    page: query.page,
    pageSize: PAGE_SIZE,
    total,
    redListVersion: sync?.redListVersion ?? "unknown",
    resolvedAs: EMPTY_RESOLVED,
  });
}

async function listAssessments(query: RedListQuery): Promise<RedListPage> {
  const direct = await runQuery(query);

  if (
    direct.total > 0 ||
    query.search === undefined ||
    query.group !== undefined
  )
    return direct;

  const group = aliasFor(query.search);
  if (group === null) return direct;

  const { search: _search, ...rest } = query;
  const fallback = await runQuery({ ...rest, group, page: 1 });

  return fallback.total === 0
    ? direct
    : redListPage.parse({
        ...fallback,
        resolvedAs: { group, from: query.search },
      });
}

const getCategoryCounts = cached(async () => {
  const rows = await db.redListAssessment.groupBy({
    by: ["categoryCode"],
    _count: { _all: true },
  });

  return rows.map((row) => ({
    categoryCode: row.categoryCode,
    count: row._count._all,
  }));
});

function groupSql(group: SpeciesGroup | undefined): Prisma.Sql {
  if (group === undefined) return Prisma.empty;

  const definition = GROUPS[group];

  if (definition.kingdom !== undefined)
    return Prisma.sql`and a."kingdom" = ${definition.kingdom}`;

  if (definition.classNames !== undefined)
    return Prisma.sql`and a."className" in (${Prisma.join(definition.classNames)})`;

  return Prisma.empty;
}

const countCountries = cachedBy(async (key: string) => {
  const group = key === "" ? undefined : (key as SpeciesGroup);
  const rows = await db.$queryRaw<CountryCategoryRow[]>`
    select l."countryCode"      as "countryCode",
           a."categoryCode"     as "categoryCode",
           count(*)::int        as "count"
    from red_list_locations l
    join red_list_assessments a on a."assessmentId" = l."assessmentId"
    where true ${groupSql(group)}
    group by 1, 2
  `;

  return buildCountryCounts(rows);
});

function getCountryCounts(query: CountryCountsQuery) {
  return countCountries(query.group ?? "");
}

async function getAssessmentDetail(
  assessmentId: number,
): Promise<RedListDetail> {
  const row = await db.redListAssessment.findUnique({
    where: { assessmentId },
    select: DETAIL_SELECT,
  });

  if (!row) throw new AppError("NOT_FOUND");

  const { detail, detailFetchedAt, ...base } = row;

  const raw: unknown =
    detailFetchedAt === null
      ? await fetchDetailWithinDeadline(assessmentId)
      : detail;

  return redListDetail.parse({
    ...base,
    ...(raw === null || raw === undefined ? EMPTY_DETAIL : mapDetail(raw)),
  });
}

const loadFeatured = cached(async () => {
  const rows = await db.redListAssessment.findMany({
    where: { scientificName: { in: FEATURED_NAMES } },
    select: SELECT,
  });

  return orderFeatured(rows);
});

async function getFeaturedSpecies(): Promise<RedListItem | null> {
  const species = pickForDay(await loadFeatured(), Date.now(), MS_PER_DAY);

  return species === null ? null : redListItem.parse(species);
}

const countGroups = cachedBy(async (key: string) => {
  const scope = parseScopeKey(key);

  const counts = await Promise.all(
    GROUP_KEYS.map(async (group: SpeciesGroup) => ({
      group,
      count: await db.redListAssessment.count({
        where: { ...scopeWhere(scope), ...groupWhere(group) },
      }),
    })),
  );

  return groupCounts.parse(counts.filter((entry) => entry.count > 0));
});

function getGroupCounts(scope: GroupCountsQuery) {
  return countGroups(scopeKey(scope));
}

export {
  getCategoryCounts,
  getCountryCounts,
  listAssessments,
  getAssessmentDetail,
  getFeaturedSpecies,
  getGroupCounts,
};
