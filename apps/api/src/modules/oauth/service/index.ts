import { db } from "@/db";
import { env } from "@/lib/env";
import {
  CODE_TTL_MS,
  MCP_PATH,
  OAUTH_SCOPE,
  PROFILE_SCOPE,
  PROTECTED_RESOURCE_PATH,
  RESOURCE_PATHS,
  TOKEN_TTL_MS,
  hashToken,
  pkceChallenge,
  randomToken,
  redirectWith,
} from "./utils";

type AuthorizationRequest = Readonly<{
  client_id: string;
  redirect_uri: string;
  code_challenge: string;
  state?: string | undefined;
  scope?: string | undefined;
  resource?: string | undefined;
}>;

function protectedResourceMetadata() {
  return {
    resource: `${env.WEB_ORIGIN}${MCP_PATH}`,
    authorization_servers: [env.WEB_ORIGIN],
    scopes_supported: [OAUTH_SCOPE],
    bearer_methods_supported: ["header"],
    resource_name: "Redlist",
  };
}

function authorizationServerMetadata() {
  return {
    issuer: env.WEB_ORIGIN,
    authorization_endpoint: `${env.WEB_ORIGIN}/oauth/authorize`,
    token_endpoint: `${env.WEB_ORIGIN}/api/oauth/token`,
    registration_endpoint: `${env.WEB_ORIGIN}/api/oauth/register`,
    response_types_supported: ["code"],
    grant_types_supported: ["authorization_code"],
    code_challenge_methods_supported: ["S256"],
    token_endpoint_auth_methods_supported: ["none"],
    scopes_supported: [OAUTH_SCOPE, PROFILE_SCOPE],
    authorization_response_iss_parameter_supported: true,
  };
}

function bearerChallenge(error?: "invalid_token"): string {
  const challenge = `Bearer resource_metadata="${env.WEB_ORIGIN}${PROTECTED_RESOURCE_PATH}", scope="${OAUTH_SCOPE}"`;

  return error === undefined ? challenge : `${challenge}, error="${error}"`;
}

async function verifyAccessToken(token: string, scope: string) {
  const record = await db.oAuthToken.findUnique({
    where: { tokenHash: hashToken(token) },
    select: {
      userId: true,
      clientId: true,
      scope: true,
      resource: true,
      expiresAt: true,
    },
  });

  const isValid =
    record !== null &&
    record.expiresAt.getTime() > Date.now() &&
    record.scope === scope &&
    record.resource === `${env.WEB_ORIGIN}${RESOURCE_PATHS[scope]}`;

  return isValid ? record : null;
}

async function userInfo(token: string) {
  const access = await verifyAccessToken(token, PROFILE_SCOPE);
  if (access === null) return null;

  const user = await db.user.findUnique({
    where: { id: access.userId },
    select: { id: true, pseudo: true, email: true },
  });

  return user === null
    ? null
    : { sub: user.id, pseudo: user.pseudo, email: user.email };
}

async function registerClient(input: { name: string; redirectUris: string[] }) {
  const client = await db.oAuthClient.create({
    data: { name: input.name, redirectUris: input.redirectUris },
  });

  return {
    client_id: client.id,
    client_id_issued_at: Math.floor(client.createdAt.getTime() / 1000),
    client_name: client.name,
    redirect_uris: client.redirectUris,
    grant_types: ["authorization_code"],
    response_types: ["code"],
    token_endpoint_auth_method: "none",
  };
}

function requestedGrant(
  request: AuthorizationRequest,
): { scope: string; resource: string } | null {
  const scope = request.scope ?? OAUTH_SCOPE;
  const path = RESOURCE_PATHS[scope];

  const isAllowed =
    path !== undefined &&
    (scope !== PROFILE_SCOPE ||
      env.PROFILE_CLIENT_IDS.includes(request.client_id));
  if (!isAllowed) return null;

  const resource = `${env.WEB_ORIGIN}${path}`;

  return (request.resource ?? resource) === resource
    ? { scope, resource }
    : null;
}

async function findAuthorizationClient(
  request: AuthorizationRequest,
): Promise<{ name: string; scope: string; resource: string } | null> {
  const client = await db.oAuthClient.findUnique({
    where: { id: request.client_id },
    select: { name: true, redirectUris: true },
  });
  const grant = requestedGrant(request);

  return client !== null &&
    client.redirectUris.includes(request.redirect_uri) &&
    grant !== null
    ? { name: client.name, ...grant }
    : null;
}

async function decideAuthorization(
  request: AuthorizationRequest,
  userId: string,
  approve: boolean,
): Promise<string | null> {
  const client = await findAuthorizationClient(request);
  if (client === null) return null;

  if (!approve)
    return redirectWith(request.redirect_uri, {
      error: "access_denied",
      state: request.state,
      iss: env.WEB_ORIGIN,
    });

  const code = randomToken();

  await db.oAuthCode.create({
    data: {
      codeHash: hashToken(code),
      clientId: request.client_id,
      userId,
      redirectUri: request.redirect_uri,
      codeChallenge: request.code_challenge,
      scope: client.scope,
      resource: client.resource,
      expiresAt: new Date(Date.now() + CODE_TTL_MS),
    },
  });

  return redirectWith(request.redirect_uri, {
    code,
    state: request.state,
    iss: env.WEB_ORIGIN,
  });
}

async function exchangeCode(input: {
  code: string;
  clientId: string;
  redirectUri: string;
  codeVerifier: string;
  resource?: string | undefined;
}) {
  const code = await db.oAuthCode
    .delete({ where: { codeHash: hashToken(input.code) } })
    .catch(() => null);

  const isValid =
    code !== null &&
    code.expiresAt.getTime() > Date.now() &&
    code.clientId === input.clientId &&
    code.redirectUri === input.redirectUri &&
    code.codeChallenge === pkceChallenge(input.codeVerifier) &&
    (input.resource ?? code.resource) === code.resource;

  if (!isValid) return null;

  const accessToken = randomToken();

  await db.oAuthToken.create({
    data: {
      tokenHash: hashToken(accessToken),
      clientId: code.clientId,
      userId: code.userId,
      scope: code.scope,
      resource: code.resource,
      expiresAt: new Date(Date.now() + TOKEN_TTL_MS),
    },
  });

  return {
    access_token: accessToken,
    token_type: "Bearer",
    expires_in: Math.floor(TOKEN_TTL_MS / 1000),
    scope: code.scope,
  };
}

export {
  verifyAccessToken,
  exchangeCode,
  findAuthorizationClient,
  decideAuthorization,
  registerClient,
  protectedResourceMetadata,
  authorizationServerMetadata,
  bearerChallenge,
  userInfo,
};
