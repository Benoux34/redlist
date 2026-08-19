const HASH_OPTIONS = {
  algorithm: "argon2id",
  memoryCost: 19456,
  timeCost: 2,
} as const;

const DUMMY_HASH = await Bun.password.hash(
  "dummy-password-for-timing-equalization",
  HASH_OPTIONS,
);

function hashPassword(password: string): Promise<string> {
  return Bun.password.hash(password, HASH_OPTIONS);
}

function verifyPassword(password: string, hash: string): Promise<boolean> {
  return Bun.password.verify(password, hash, "argon2id");
}

async function fakeVerifyPassword(password: string): Promise<void> {
  await Bun.password.verify(password, DUMMY_HASH, "argon2id");
}

export { hashPassword, verifyPassword, fakeVerifyPassword };
