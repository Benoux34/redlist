import type { LoginInput, RegisterInput } from "@app/contracts";
import { fakeVerifyPassword, hashPassword, verifyPassword } from "./password";
import { db } from "../../db";
import { createSession } from "./session";
import { AppError } from "../../lib/errors";
import { Prisma } from "../../generated/prisma/client";

const UNIQUE_CONSTRAINT_ERROR = "P2002";

async function register(input: RegisterInput, userAgent: string | null) {
  const passwordHash = await hashPassword(input.password);

  try {
    const user = await db.user.create({
      data: {
        pseudo: input.pseudo,
        email: input.email,
        passwordHash,
      },
      select: { id: true, pseudo: true, email: true, createdAt: true },
    });

    const session = await createSession(user.id, userAgent);

    return { user, session };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === UNIQUE_CONSTRAINT_ERROR
    ) {
      const target = error.meta?.["target"];
      const fields = Array.isArray(target) ? target : [];

      throw new AppError(
        fields.includes("email") ? "EMAIL_TAKEN" : "PSEUDO_TAKEN",
      );
    }

    throw error;
  }
}

async function login(input: LoginInput, userAgent: string | null) {
  const user = await db.user.findUnique({
    where: { email: input.email },
    select: {
      id: true,
      pseudo: true,
      email: true,
      createdAt: true,
      passwordHash: true,
    },
  });

  if (!user) {
    await fakeVerifyPassword(input.password);
    throw new AppError("INVALID_CREDENTIALS");
  }

  const isValid = await verifyPassword(input.password, user.passwordHash);
  if (!isValid) throw new AppError("INVALID_CREDENTIALS");

  const { passwordHash: _passwordHash, ...publicFields } = user;
  const session = await createSession(user.id, userAgent);

  return { user: publicFields, session };
}

export { register, login };
