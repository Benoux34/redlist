const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;
const SESSION_RENEWAL_THRESHOLD_MS = SESSION_TTL_MS / 2;
const TOKEN_BYTES = 32;
const USER_AGENT_MAX_LENGTH = 255;

function generateSessionToken(): string {
  return Buffer.from(
    crypto.getRandomValues(new Uint8Array(TOKEN_BYTES)),
  ).toString("base64url");
}

function hashSessionToken(token: string): string {
  return new Bun.CryptoHasher("sha256").update(token).digest("hex");
}

export {
  SESSION_TTL_MS,
  SESSION_RENEWAL_THRESHOLD_MS,
  TOKEN_BYTES,
  USER_AGENT_MAX_LENGTH,
  generateSessionToken,
  hashSessionToken,
};
