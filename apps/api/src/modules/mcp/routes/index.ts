import { Hono } from "hono";
import { createMcpHandler } from "@modelcontextprotocol/server";
import type { AppEnv } from "@/middleware/auth/entities";
import { rateLimit } from "@/lib/rate-limit";
import { bearerChallenge, verifyAccessToken } from "@/modules/oauth/service";
import { createRedlistServer } from "../service";

const mcpHandler = createMcpHandler((ctx) => createRedlistServer(ctx.authInfo));

const mcpRoutes = new Hono<AppEnv>().all(
  "/",
  rateLimit({ limit: 60, windowMs: 60 * 1000, keyPrefix: "mcp" }),
  async (c) => {
    const token = /^Bearer (\S+)$/i.exec(
      c.req.header("authorization") ?? "",
    )?.[1];
    if (token === undefined)
      return c.json({ error: "unauthorized" }, 401, {
        "WWW-Authenticate": bearerChallenge(),
      });

    const access = await verifyAccessToken(token);
    if (access === null)
      return c.json({ error: "invalid_token" }, 401, {
        "WWW-Authenticate": bearerChallenge("invalid_token"),
      });

    return mcpHandler.fetch(c.req.raw, {
      authInfo: {
        token,
        clientId: access.clientId,
        scopes: [access.scope],
        expiresAt: Math.floor(access.expiresAt.getTime() / 1000),
        extra: { userId: access.userId },
      },
    });
  },
);

export { mcpRoutes };
