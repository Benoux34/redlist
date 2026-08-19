import { zValidator } from "@hono/zod-validator";
import { redListDetailParams, redListQuery } from "@app/contracts";
import { Hono } from "hono";
import type { AppEnv } from "../../middleware/auth/entities";
import { rateLimit } from "../../lib/rate-limit";
import {
  getAssessmentDetail,
  getCategoryCounts,
  getSpeciesOfTheDay,
  listAssessments,
} from "./service";
import { AppError } from "../../lib/errors";

const listLimiter = rateLimit({
  limit: 60,
  windowMs: 60 * 1000,
  keyPrefix: "red-list",
});

const detailLimiter = rateLimit({
  limit: 30,
  windowMs: 60 * 1000,
  keyPrefix: "red-list-detail",
});

const redListRoutes = new Hono<AppEnv>()
  .get("/", listLimiter, zValidator("query", redListQuery), async (c) =>
    c.json(await listAssessments(c.req.valid("query"))),
  )
  .get("/counts", listLimiter, async (c) => c.json(await getCategoryCounts()))
  .get("/species-of-the-day", listLimiter, async (c) => {
    const species = await getSpeciesOfTheDay();
    if (species === null) throw new AppError("NOT_FOUND");

    return c.json(species);
  })
  .get(
    "/:assessmentId",
    detailLimiter,
    zValidator("param", redListDetailParams),
    async (c) =>
      c.json(await getAssessmentDetail(c.req.valid("param").assessmentId)),
  );

export { redListRoutes };
