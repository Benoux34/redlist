import { Hono } from "hono";
import type { AppEnv } from "../../middleware/auth/entities";
import {
  addFavorite,
  isFavorite,
  listFavorites,
  removeFavorite,
} from "./service";
import { requireAuth } from "../../middleware/auth";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { currentUserId } from "../../lib/current-user-id";

const params = z.object({
  assessmentId: z.coerce.number().int().positive(),
});

const favoriteRoutes = new Hono<AppEnv>()
  .use("*", requireAuth)
  .get("/", async (c) => c.json(await listFavorites(currentUserId(c))))
  .get("/:assessmentId", zValidator("param", params), async (c) =>
    c.json(
      await isFavorite(currentUserId(c), c.req.valid("param").assessmentId),
    ),
  )
  .put("/:assessmentId", zValidator("param", params), async (c) =>
    c.json(
      await addFavorite(currentUserId(c), c.req.valid("param").assessmentId),
    ),
  )
  .delete("/:assessmentId", zValidator("param", params), async (c) =>
    c.json(
      await removeFavorite(currentUserId(c), c.req.valid("param").assessmentId),
    ),
  );

export { favoriteRoutes };
