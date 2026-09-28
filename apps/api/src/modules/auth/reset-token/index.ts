import { db } from "@/db";
import { generateSessionToken, hashSessionToken } from "../session";
import { isResetTokenValid, resetTokenExpiresAt } from "./utils";

async function createResetToken(userId: string): Promise<string> {
  const token = generateSessionToken();

  await db.user.update({
    where: { id: userId },
    data: {
      resetTokenHash: hashSessionToken(token),
      resetTokenExpiresAt: resetTokenExpiresAt(Date.now()),
    },
  });

  return token;
}

async function consumeResetToken(token: string): Promise<string | null> {
  const resetTokenHash = hashSessionToken(token);

  const user = await db.user.findUnique({
    where: { resetTokenHash },
    select: { id: true, resetTokenExpiresAt: true },
  });

  if (user === null) return null;

  const { count } = await db.user.updateMany({
    where: { id: user.id, resetTokenHash },
    data: { resetTokenHash: null, resetTokenExpiresAt: null },
  });

  if (count === 0) return null;

  return isResetTokenValid(user.resetTokenExpiresAt, Date.now())
    ? user.id
    : null;
}

export { createResetToken, consumeResetToken };
