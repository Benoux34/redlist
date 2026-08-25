import { DUMMY_HASH, HASH_OPTIONS } from "./utils";

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
