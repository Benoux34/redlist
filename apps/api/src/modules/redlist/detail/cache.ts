import { iucnRequest } from "@/sources";
import { db } from "@/db";
import { Prisma } from "@/generated/prisma/client";

async function fetchAndStoreDetail(assessmentId: number): Promise<unknown> {
  const raw = await iucnRequest(`/assessment/${assessmentId}`);

  await db.redListAssessment.update({
    where: { assessmentId },
    data: {
      detail: raw as Prisma.InputJsonValue,
      detailFetchedAt: new Date(),
    },
  });

  return raw;
}

export { fetchAndStoreDetail };
