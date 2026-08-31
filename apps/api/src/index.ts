import { Hono } from "hono";
import type { AppEnv } from "./middleware/auth/entities";
import { secureHeaders } from "hono/secure-headers";
import { csrf } from "hono/csrf";
import { env } from "./lib/env";
import { cors } from "hono/cors";
import { sessionMiddleware } from "./middleware/auth";
import { authRoutes } from "./modules/auth/routes";
import { AppError } from "./lib/errors";
import { HTTPException } from "hono/http-exception";
import { redListRoutes } from "./modules/redlist";
import { favoriteRoutes } from "./modules/favorite/routes";
import { startSessionCleanup } from "./modules/auth/session";
import { db } from "./db";

const app = new Hono<AppEnv>();

app.use(
  "*",
  secureHeaders({
    contentSecurityPolicy: {
      defaultSrc: ["'none'"],
      frameAncestors: ["'none'"],
      baseUri: ["'none'"],
      formAction: ["'none'"],
    },
  }),
);

app.get("/health", async (c) => {
  try {
    await db.$queryRaw`SELECT 1`;
  } catch (error) {
    console.error("Health check failed:", error);
    return c.json({ status: "degraded", database: "down" }, 503);
  }

  return c.json({ status: "ok", database: "up" });
});

app.use(
  "*",
  cors({
    origin: env.WEB_ORIGIN,
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type"],
  }),
);
app.use("*", csrf({ origin: env.WEB_ORIGIN }));
app.use("*", sessionMiddleware);

app.route("/api/auth", authRoutes);
app.route("/api/red-list", redListRoutes);
app.route("/api/favorites", favoriteRoutes);

app.onError((error, c) => {
  if (error instanceof AppError)
    return c.json({ code: error.code }, error.status);

  if (error instanceof HTTPException) return error.getResponse();

  console.error(error);
  return c.json({ code: "INTERNAL_ERROR" }, 500);
});

app.notFound((c) => c.json({ code: "NOT_FOUND" }, 404));

startSessionCleanup();

export default {
  port: env.PORT,
  fetch: app.fetch,
};
