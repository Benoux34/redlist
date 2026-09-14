import { iucnRequest } from "@/sources";
import { db } from "@/db";
import { Prisma } from "@/generated/prisma/client";
import { DETAIL_DEADLINE_MS } from "./utils";

const inFlight = new Map<number, Promise<unknown>>();

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

function fetchAndStoreDetailOnce(assessmentId: number): Promise<unknown> {
  const pending = inFlight.get(assessmentId);
  if (pending !== undefined) return pending;

  const request = fetchAndStoreDetail(assessmentId).finally(() => {
    inFlight.delete(assessmentId);
  });

  inFlight.set(assessmentId, request);

  return request;
}

async function fetchDetailWithinDeadline(
  assessmentId: number,
  deadlineMs: number = DETAIL_DEADLINE_MS,
): Promise<unknown> {
  const request = fetchAndStoreDetailOnce(assessmentId);

  request.catch((error: unknown) => {
    console.error(`IUCN detail failed for ${assessmentId}:`, error);
  });

  let timer: ReturnType<typeof setTimeout> | undefined;

  const deadline = new Promise<null>((resolve) => {
    timer = setTimeout(() => resolve(null), deadlineMs);
  });

  try {
    return await Promise.race([request.catch(() => null), deadline]);
  } finally {
    clearTimeout(timer);
  }
}

export { fetchAndStoreDetail, fetchDetailWithinDeadline };
