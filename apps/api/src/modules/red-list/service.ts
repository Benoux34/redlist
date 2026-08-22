import type {
  RedListDetail,
  RedListItem,
  RedListPage,
  RedListQuery,
} from "@app/contracts";
import { redListDetail, redListItem, redListPage } from "@app/contracts";
import { db } from "../../db";
import { Prisma } from "../../generated/prisma/client";
import { AppError } from "../../lib/errors";
import { EMPTY_DETAIL, mapDetail } from "./detail-mapper";
import { fetchAndStoreDetail } from "./detail-cache";

const PAGE_SIZE = 40;
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
const MS_PER_DAY = 86_400_000;

function buildWhere(query: RedListQuery): Prisma.RedListAssessmentWhereInput {
  return {
    ...(query.category ? { categoryCode: query.category } : {}),
    ...(query.withPhoto === true ? { photoUrl: { not: null } } : {}),
    ...(query.possiblyExtinct === true ? { possiblyExtinct: true } : {}),
    ...(query.letter
      ? { scientificName: { startsWith: query.letter, mode: "insensitive" } }
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

async function listAssessments(query: RedListQuery): Promise<RedListPage> {
  const where = buildWhere(query);

  const [rows, total, sync] = await Promise.all([
    db.redListAssessment.findMany({
      where,
      select: SELECT,
      orderBy: [
        { photoUrl: { sort: "asc", nulls: "last" } },
        { scientificName: "asc" },
      ],
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
  });
}

async function getCategoryCounts() {
  const rows = await db.redListAssessment.groupBy({
    by: ["categoryCode"],
    _count: { _all: true },
  });

  return rows.map((row) => ({
    categoryCode: row.categoryCode,
    count: row._count._all,
  }));
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

  let raw: unknown = detail;

  if (detailFetchedAt === null) {
    try {
      raw = await fetchAndStoreDetail(assessmentId);
    } catch (error) {
      console.error(`IUCN detail failed for ${assessmentId}:`, error);
      raw = null;
    }
  }

  return redListDetail.parse({
    ...base,
    ...(raw === null || raw === undefined ? EMPTY_DETAIL : mapDetail(raw)),
  });
}

async function getSpeciesOfTheDay(): Promise<RedListItem | null> {
  const where: Prisma.RedListAssessmentWhereInput = {
    photoUrl: { not: null },
    description: { not: null },
  };

  const total = await db.redListAssessment.count({ where });

  if (total === 0) return null;

  const dayIndex = Math.floor(Date.now() / MS_PER_DAY);
  const offset = dayIndex % total;

  const [row] = await db.redListAssessment.findMany({
    where,
    select: SELECT,
    orderBy: { assessmentId: "asc" },
    skip: offset,
    take: 1,
  });

  return row === undefined ? null : redListItem.parse(row);
}

export {
  getCategoryCounts,
  listAssessments,
  getAssessmentDetail,
  getSpeciesOfTheDay,
};
