import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginInput, registerInput } from "@app/contracts";
import type { AppEnv } from "@/middleware/auth/entities";
import {
  clearSessionCookie,
  getSessionCookie,
  setSessionCookie,
  rateLimit,
  AppError,
} from "@/lib";
import { deleteAccount, login, register } from "../service";
import { invalidateSession } from "../session";
import { LOGIN_LIMIT, REGISTER_LIMIT, USER_AGENT_HEADER } from "./utils";
import { currentUserId, requireAuth } from "@/middleware";

const authRoutes = new Hono<AppEnv>()
  .post(
    "/register",
    rateLimit(REGISTER_LIMIT),
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
    rateLimit(LOGIN_LIMIT),
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
