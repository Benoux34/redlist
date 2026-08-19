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
import { redListRoutes } from "./modules/red-list/routes";

const app = new Hono<AppEnv>();

app.use("*", secureHeaders());
app.use(
  "*",
  cors({
    origin: env.WEB_ORIGIN,
    credentials: true,
    allowMethods: ["GET", "POST", "PATCH", "DELETE"],
    allowHeaders: ["Content-Type"],
  }),
);
app.use("*", csrf({ origin: env.WEB_ORIGIN }));
app.use("*", sessionMiddleware);

app.route("/api/auth", authRoutes);
app.route("/api/red-list", redListRoutes);
app.get("/health", (c) => c.json({ status: "ok" }));

app.onError((error, c) => {
  if (error instanceof AppError)
    return c.json({ code: error.code }, error.status);

  if (error instanceof HTTPException) return error.getResponse();

  console.error(error);
  return c.json({ code: "INTERNAL_ERROR" }, 500);
});

app.notFound((c) => c.json({ code: "NOT_FOUND" }, 404));

export default {
  port: env.PORT,
  fetch: app.fetch,
};
