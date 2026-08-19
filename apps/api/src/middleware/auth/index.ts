import type { MiddlewareHandler } from "hono";
import type { AppEnv } from "./entities";
import {
  clearSessionCookie,
  getSessionCookie,
  setSessionCookie,
} from "../../lib/cookies";
import { validateSession } from "../../modules/auth/session";

const sessionMiddleware: MiddlewareHandler<AppEnv> = async (c, next) => {
  const token = getSessionCookie(c);

  if (!token) {
    c.set("user", null);
    return next();
  }

  const session = await validateSession(token);

  if (!session) {
    clearSessionCookie(c);
    c.set("user", null);
    return next();
  }

  setSessionCookie(c, token, session.expiresAt);
  c.set("user", session.user);

  return next();
};

const requireAuth: MiddlewareHandler<AppEnv> = async (c, next) => {
  if (!c.get("user")) return c.json({ code: "UNAUTHENTICATED" }, 401);

  return next();
};

export { sessionMiddleware, requireAuth };
