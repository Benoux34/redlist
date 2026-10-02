import { rateLimit } from "@/lib/rate-limit";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  countryCountsQuery,
  groupCountsQuery,
  redListDetailParams,
  redListQuery,
  sitemapParams,
} from "@app/contracts";
import type { AppEnv } from "@/middleware/auth/entities";
import { AppError } from "@/lib/errors";
import {
  getAssessmentDetail,
  getCategoryCounts,
  getCountryCounts,
  getGroupCounts,
  getFeaturedSpecies,
  listAssessments,
  getCountriesSitemap,
  getPagesSitemap,
  getRedListVersion,
  getSitemapIndex,
  getSpeciesSitemap,
  buildSpeciesMeta,
  renderMetaDocument,
} from "../service";

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

const XML_HEADERS = {
  "Content-Type": "application/xml; charset=utf-8",
  "Cache-Control": "public, max-age=3600",
} as const;

const redListRoutes = new Hono<AppEnv>()
  .get("/", listLimiter, zValidator("query", redListQuery), async (c) =>
    c.json(await listAssessments(c.req.valid("query"))),
  )
  .get("/counts", listLimiter, async (c) => c.json(await getCategoryCounts()))
  .get(
    "/countries",
    listLimiter,
    zValidator("query", countryCountsQuery),
    async (c) => c.json(await getCountryCounts(c.req.valid("query"))),
  )
  .get(
    "/groups",
    listLimiter,
    zValidator("query", groupCountsQuery),
    async (c) => c.json(await getGroupCounts(c.req.valid("query"))),
  )
  .get("/version", listLimiter, async (c) => c.json(await getRedListVersion()))
  .get("/featured", listLimiter, async (c) => {
    const species = await getFeaturedSpecies();
    if (species === null) throw new AppError("NOT_FOUND");

    return c.json(species);
  })
  .get("/sitemap.xml", listLimiter, async (c) =>
    c.text(await getSitemapIndex(), 200, XML_HEADERS),
  )
  .get("/sitemap-pages.xml", listLimiter, async (c) =>
    c.text(await getPagesSitemap(), 200, XML_HEADERS),
  )
  .get("/sitemap-countries.xml", listLimiter, async (c) =>
    c.text(await getCountriesSitemap(), 200, XML_HEADERS),
  )
  .get(
    "/sitemap-species/:page",
    listLimiter,
    zValidator("param", sitemapParams),
    async (c) => {
      const xml = await getSpeciesSitemap(c.req.valid("param").page);
      if (xml === null) throw new AppError("NOT_FOUND");

      return c.text(xml, 200, XML_HEADERS);
    },
  )
  .get(
    "/preview/:assessmentId",
    listLimiter,
    zValidator("param", redListDetailParams),
    async (c) =>
      c.html(
        renderMetaDocument(
          await buildSpeciesMeta(c.req.valid("param").assessmentId),
        ),
      ),
  )
  .get(
    "/:assessmentId",
    detailLimiter,
    zValidator("param", redListDetailParams),
    async (c) =>
      c.json(await getAssessmentDetail(c.req.valid("param").assessmentId)),
  );

export { redListRoutes };
