import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { redListDetailParams } from "@app/contracts";
import type { AppEnv } from "@/middleware/auth/entities";
import { currentUserId, requireAuth } from "@/middleware/auth";
import {
  addFavorite,
  isFavorite,
  listFavorites,
  removeFavorite,
} from "../service";

const favoriteRoutes = new Hono<AppEnv>()
  .use("*", requireAuth)
  .get("/", async (c) => c.json(await listFavorites(currentUserId(c))))
  .get("/:assessmentId", zValidator("param", redListDetailParams), async (c) =>
    c.json(
      await isFavorite(currentUserId(c), c.req.valid("param").assessmentId),
    ),
  )
  .put("/:assessmentId", zValidator("param", redListDetailParams), async (c) =>
    c.json(
      await addFavorite(currentUserId(c), c.req.valid("param").assessmentId),
    ),
  )
  .delete(
    "/:assessmentId",
    zValidator("param", redListDetailParams),
    async (c) =>
      c.json(
        await removeFavorite(
          currentUserId(c),
          c.req.valid("param").assessmentId,
        ),
      ),
  );

export { favoriteRoutes };
