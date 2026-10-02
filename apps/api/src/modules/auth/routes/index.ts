import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  forgotPasswordInput,
  loginInput,
  registerInput,
  resetPasswordInput,
} from "@app/contracts";
import type { AppEnv } from "@/middleware/auth/entities";
import {
  clearSessionCookie,
  getSessionCookie,
  setSessionCookie,
} from "@/lib/cookies";
import { rateLimit } from "@/lib/rate-limit";
import { AppError } from "@/lib/errors";
import {
  deleteAccount,
  login,
  register,
  requestPasswordReset,
  invalidateSession,
  resetPassword,
} from "../service";
import { currentUserId, requireAuth } from "@/middleware/auth";

const USER_AGENT_HEADER = "user-agent";

const REGISTER_LIMIT = {
  limit: 5,
  windowMs: 60 * 60 * 1000,
  keyPrefix: "register",
} as const;

const LOGIN_LIMIT = {
  limit: 10,
  windowMs: 15 * 60 * 1000,
  keyPrefix: "login",
} as const;

const FORGOT_PASSWORD_LIMIT = {
  limit: 5,
  windowMs: 60 * 60 * 1000,
  keyPrefix: "forgot-password",
} as const;

const RESET_PASSWORD_LIMIT = {
  limit: 10,
  windowMs: 15 * 60 * 1000,
  keyPrefix: "reset-password",
} as const;

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
  .post(
    "/forgot-password",
    rateLimit(FORGOT_PASSWORD_LIMIT),
    zValidator("json", forgotPasswordInput),
    (c) => {
      void requestPasswordReset(c.req.valid("json")).catch((error: unknown) => {
        console.error("Password reset request failed:", error);
      });

      return c.body(null, 204);
    },
  )
  .post(
    "/reset-password",
    rateLimit(RESET_PASSWORD_LIMIT),
    zValidator("json", resetPasswordInput),
    async (c) => {
      await resetPassword(c.req.valid("json"));
      clearSessionCookie(c);

      return c.body(null, 204);
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

export { authRoutes, USER_AGENT_HEADER, REGISTER_LIMIT, LOGIN_LIMIT };
