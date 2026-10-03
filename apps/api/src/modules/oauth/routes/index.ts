import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import type { AppEnv } from "@/middleware/auth/entities";
import { rateLimit } from "@/lib/rate-limit";
import { currentUserId, requireAuth } from "@/middleware/auth";
import {
  authorizationServerMetadata,
  decideAuthorization,
  exchangeCode,
  findAuthorizationClient,
  protectedResourceMetadata,
  registerClient,
} from "../service";
import {
  AUTHORIZATION_SERVER_PATH,
  PROTECTED_RESOURCE_PATH,
  TOKEN_PATH,
} from "../service/utils";
import {
  registerClientBody,
  authorizationRequest,
  tokenRequest,
  NO_STORE,
  INVALID_REQUEST,
} from "./utils";

const oauthRoutes = new Hono<AppEnv>()
  .get(PROTECTED_RESOURCE_PATH, (c) => c.json(protectedResourceMetadata()))
  .get(AUTHORIZATION_SERVER_PATH, (c) => c.json(authorizationServerMetadata()))
  .post(
    "/api/oauth/register",
    rateLimit({
      limit: 30,
      windowMs: 60 * 60 * 1000,
      keyPrefix: "oauth-register",
    }),
    zValidator("json", registerClientBody, (result, c) =>
      result.success
        ? undefined
        : c.json(
            {
              error: "invalid_client_metadata",
              error_description: "client_name or redirect_uris is invalid",
            },
            400,
          ),
    ),
    async (c) => {
      const body = c.req.valid("json");

      return c.json(
        await registerClient({
          name: body.client_name,
          redirectUris: body.redirect_uris,
        }),
        201,
      );
    },
  )
  .get(
    "/api/oauth/authorize",
    zValidator("query", authorizationRequest, (result, c) =>
      result.success ? undefined : c.json(INVALID_REQUEST, 400),
    ),
    async (c) => {
      const client = await findAuthorizationClient(c.req.valid("query"));

      return client === null
        ? c.json(INVALID_REQUEST, 400)
        : c.json({ client_name: client.name });
    },
  )
  .post(
    "/api/oauth/authorize",
    requireAuth,
    zValidator(
      "json",
      authorizationRequest.extend({ approve: z.boolean() }),
      (result, c) =>
        result.success ? undefined : c.json(INVALID_REQUEST, 400),
    ),
    async (c) => {
      const { approve, ...request } = c.req.valid("json");
      const redirectTo = await decideAuthorization(
        request,
        currentUserId(c),
        approve,
      );

      return redirectTo === null
        ? c.json(INVALID_REQUEST, 400)
        : c.json({ redirect_to: redirectTo });
    },
  )
  .post(
    TOKEN_PATH,
    rateLimit({ limit: 60, windowMs: 60 * 1000, keyPrefix: "oauth-token" }),
    zValidator("form", tokenRequest, (result, c) =>
      result.success
        ? undefined
        : c.json({ error: "invalid_request" }, 400, NO_STORE),
    ),
    async (c) => {
      const body = c.req.valid("form");
      const token = await exchangeCode({
        code: body.code,
        clientId: body.client_id,
        redirectUri: body.redirect_uri,
        codeVerifier: body.code_verifier,
        resource: body.resource,
      });

      return token === null
        ? c.json({ error: "invalid_grant" }, 400, NO_STORE)
        : c.json(token, 200, NO_STORE);
    },
  );

export { oauthRoutes };
