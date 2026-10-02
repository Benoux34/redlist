import { Hono } from "hono";
import { createMcpHandler } from "@modelcontextprotocol/server";
import type { AppEnv } from "@/middleware/auth/entities";
import { rateLimit } from "@/lib/rate-limit";
import { createRedlistServer } from "../service";

const mcpHandler = createMcpHandler(() => createRedlistServer());

const mcpRoutes = new Hono<AppEnv>().all(
  "/",
  rateLimit({ limit: 60, windowMs: 60 * 1000, keyPrefix: "mcp" }),
  (c) => mcpHandler.fetch(c.req.raw),
);

export { mcpRoutes };
