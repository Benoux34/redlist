import {
  favoriteList,
  type FavoriteList,
  type FavoriteState,
} from "@app/contracts";
import { db } from "@/db";
import { AppError } from "@/lib";
import { ASSESSMENT_SELECT } from "./utils";

async function addFavorite(
  userId: string,
  assessmentId: number,
): Promise<FavoriteState> {
  const assessment = await db.redListAssessment.findUnique({
    where: { assessmentId },
    select: { categoryCode: true, redListVersion: true },
  });

  if (assessment === null) throw new AppError("NOT_FOUND");

  await db.favorite.upsert({
    where: { userId_assessmentId: { userId, assessmentId } },
    create: {
      userId,
      assessmentId,
      categoryAtAdd: assessment.categoryCode,
      versionAtAdd: assessment.redListVersion,
    },
    update: {},
  });

  return { isFavorite: true };
}

async function removeFavorite(
  userId: string,
  assessmentId: number,
): Promise<FavoriteState> {
  await db.favorite.deleteMany({ where: { userId, assessmentId } });

  return { isFavorite: false };
}

async function isFavorite(
  userId: string,
  assessmentId: number,
): Promise<FavoriteState> {
  const row = await db.favorite.findUnique({
    where: { userId_assessmentId: { userId, assessmentId } },
    select: { userId: true },
  });

  return { isFavorite: row !== null };
}

async function listFavorites(userId: string): Promise<FavoriteList> {
  const rows = await db.favorite.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: {
      createdAt: true,
      categoryAtAdd: true,
      assessment: { select: ASSESSMENT_SELECT },
    },
  });

  return favoriteList.parse({
    items: rows.map((row) => ({
      ...row.assessment,
      followedAt: row.createdAt.toISOString(),
      categoryAtAdd: row.categoryAtAdd,
      categoryChanged: row.categoryAtAdd !== row.assessment.categoryCode,
    })),
    total: rows.length,
  });
}

export { addFavorite, removeFavorite, isFavorite, listFavorites };
