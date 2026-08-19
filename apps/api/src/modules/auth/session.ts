import { db } from "../../db";

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;
const SESSION_RENEWAL_THRESHOLD_MS = SESSION_TTL_MS / 2;
const TOKEN_BYTES = 32;
const USER_AGENT_MAX_LENGTH = 255;

function generateSessionToken(): string {
  const bytes = new Uint8Array(TOKEN_BYTES);
  crypto.getRandomValues(bytes);

  return Buffer.from(bytes).toString("base64url");
}

function hashSessionToken(token: string): string {
  return new Bun.CryptoHasher("sha256").update(token).digest("hex");
}

async function createSession(
  userId: string,
  userAgent: string | null,
): Promise<{ token: string; expiresAt: Date }> {
  const token = generateSessionToken();
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

  await db.session.create({
    data: {
      tokenHash: hashSessionToken(token),
      userId,
      expiresAt,
      userAgent: userAgent?.slice(0, USER_AGENT_MAX_LENGTH) ?? null,
    },
  });

  return { token, expiresAt };
}

async function validateSession(token: string) {
  const session = await db.session.findUnique({
    where: { tokenHash: hashSessionToken(token) },
    include: {
      user: {
        select: { id: true, pseudo: true, email: true, createdAt: true },
      },
    },
  });
  if (!session) return null;

  const now = Date.now();
  if (session.expiresAt.getTime() <= now) {
    await db.session.delete({ where: { id: session.id } });
    return null;
  }

  const shouldRenew =
    session.expiresAt.getTime() - now < SESSION_RENEWAL_THRESHOLD_MS;
  if (shouldRenew) {
    const expiresAt = new Date(now + SESSION_TTL_MS);
    await db.session.update({
      where: { id: session.id },
      data: { expiresAt, lastUsedAt: new Date(now) },
    });
    return { user: session.user, expiresAt };
  }

  return { user: session.user, expiresAt: session.expiresAt };
}

async function invalidateSession(token: string): Promise<void> {
  await db.session.deleteMany({
    where: { tokenHash: hashSessionToken(token) },
  });
}

async function invalidateAllUserSessions(userId: string): Promise<void> {
  await db.session.deleteMany({ where: { userId } });
}

export {
  generateSessionToken,
  hashSessionToken,
  createSession,
  invalidateAllUserSessions,
  invalidateSession,
  validateSession,
};
