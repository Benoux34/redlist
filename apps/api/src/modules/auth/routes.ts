import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import type { AppEnv } from "../../middleware/auth/entities";
import { rateLimit } from "../../lib/rate-limit";
import { loginInput, registerInput } from "@app/contracts";
import { deleteAccount, login, register } from "./service";
import {
  clearSessionCookie,
  getSessionCookie,
  setSessionCookie,
} from "../../lib/cookies";
import { invalidateSession } from "./session";
import { requireAuth } from "../../middleware/auth";
import { AppError } from "../../lib/errors";
import { currentUserId } from "../../lib/current-user-id";

const USER_AGENT_HEADER = "user-agent";

const authRoutes = new Hono<AppEnv>()
  .post(
    "/register",
    rateLimit({ limit: 5, windowMs: 60 * 60 * 1000, keyPrefix: "register" }),
    zValidator("json", registerInput),
    async (c) => {
      const input = c.req.valid("json");
      const userAgent = c.req.header(USER_AGENT_HEADER) ?? null;

      const { user, session } = await register(input, userAgent);
      setSessionCookie(c, session.token, session.expiresAt);

      return c.json({ user }, 201);
    },
  )
  .post(
    "/login",
    rateLimit({ limit: 10, windowMs: 15 * 60 * 1000, keyPrefix: "login" }),
    zValidator("json", loginInput),
    async (c) => {
      const input = c.req.valid("json");
      const userAgent = c.req.header(USER_AGENT_HEADER) ?? null;

      const { user, session } = await login(input, userAgent);
      setSessionCookie(c, session.token, session.expiresAt);

      return c.json({ user });
    },
  )
  .post("/logout", async (c) => {
    const token = getSessionCookie(c);

    if (token) await invalidateSession(token);

    clearSessionCookie(c);

    return c.body(null, 204);
  })
  .get("/me", requireAuth, (c) => {
    const user = c.get("user");

    if (!user) throw new AppError("UNAUTHENTICATED");

    return c.json({ user });
  })
  .delete("/me", requireAuth, async (c) => {
    const token = getSessionCookie(c);

    await deleteAccount(currentUserId(c));

    if (token !== undefined) await invalidateSession(token);

    clearSessionCookie(c);
    return c.body(null, 204);
  });

export { authRoutes };
