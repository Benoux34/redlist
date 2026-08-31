import { iucnRequest } from "@/sources";
import { db } from "@/db";
import { Prisma } from "@/generated/prisma/client";
import { DETAIL_DEADLINE_MS } from "./utils";

// The IUCN client serialises every call behind a global throttle, so two
// visitors landing on the same cold species would queue two identical requests.
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

/**
 * Fetches the IUCN detail, but never makes the visitor wait on the throttle
 * queue for longer than the deadline.
 *
 * On timeout the request is *not* cancelled: it keeps running and writes to the
 * cache, so the page renders immediately without the detail sections and the
 * next visitor gets the full version. Returns null when nothing is available in
 * time.
 */
async function fetchDetailWithinDeadline(
  assessmentId: number,
  deadlineMs: number = DETAIL_DEADLINE_MS,
): Promise<unknown> {
  const request = fetchAndStoreDetailOnce(assessmentId);

  // Attached here so a later rejection is never an unhandled one, whether or
  // not the race below is still listening.
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
