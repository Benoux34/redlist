import z from "zod";
import { isAllowedRedirectUri } from "../service/utils";

const registerClientBody = z.object({
  client_name: z.string().trim().min(1).max(100).default("Client OAuth"),
  redirect_uris: z
    .array(z.string().max(500).refine(isAllowedRedirectUri))
    .min(1)
    .max(5),
});

const authorizationRequest = z.object({
  client_id: z.uuid(),
  redirect_uri: z.string().max(500),
  response_type: z.literal("code"),
  code_challenge: z.string().regex(/^[A-Za-z0-9_-]{43}$/),
  code_challenge_method: z.literal("S256"),
  state: z.string().max(500).optional(),
  scope: z.string().max(200).optional(),
  resource: z.string().max(500).optional(),
});

const tokenRequest = z.object({
  grant_type: z.literal("authorization_code"),
  code: z.string().min(1).max(200),
  redirect_uri: z.string().max(500),
  client_id: z.uuid(),
  code_verifier: z.string().regex(/^[A-Za-z0-9\-._~]{43,128}$/),
  resource: z.string().max(500).optional(),
});

const NO_STORE = { "Cache-Control": "no-store", Pragma: "no-cache" } as const;

const INVALID_REQUEST = {
  error: "invalid_request",
  error_description: "This authorization request is not valid.",
} as const;

export {
  registerClientBody,
  authorizationRequest,
  tokenRequest,
  NO_STORE,
  INVALID_REQUEST,
};
