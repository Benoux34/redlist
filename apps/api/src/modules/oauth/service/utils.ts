const OAUTH_SCOPE = "favorites:read";
const PROTECTED_RESOURCE_PATH = "/.well-known/oauth-protected-resource";
const AUTHORIZATION_SERVER_PATH = "/.well-known/oauth-authorization-server";
const MCP_PATH = "/api/mcp";
const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1"]);
const CODE_TTL_MS = 5 * 60 * 1000;
const TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const TOKEN_PATH = "/api/oauth/token";

function randomToken(): string {
  return Buffer.from(crypto.getRandomValues(new Uint8Array(32))).toString(
    "base64url",
  );
}

function hashToken(token: string): string {
  return new Bun.CryptoHasher("sha256").update(token).digest("hex");
}

function pkceChallenge(codeVerifier: string): string {
  return new Bun.CryptoHasher("sha256")
    .update(codeVerifier)
    .digest("base64url");
}

function redirectWith(
  redirectUri: string,
  params: Readonly<Record<string, string | undefined>>,
): string {
  const url = new URL(redirectUri);

  for (const [key, value] of Object.entries(params))
    if (value !== undefined) url.searchParams.set(key, value);

  return url.toString();
}

function isAllowedRedirectUri(value: string): boolean {
  let url: URL;

  try {
    url = new URL(value);
  } catch {
    return false;
  }

  if (url.hash !== "") return false;
  if (url.protocol === "https:") return true;

  return url.protocol === "http:" && LOCAL_HOSTNAMES.has(url.hostname);
}

export {
  OAUTH_SCOPE,
  PROTECTED_RESOURCE_PATH,
  AUTHORIZATION_SERVER_PATH,
  MCP_PATH,
  CODE_TTL_MS,
  TOKEN_TTL_MS,
  TOKEN_PATH,
  isAllowedRedirectUri,
  pkceChallenge,
  randomToken,
  hashToken,
  redirectWith,
};
