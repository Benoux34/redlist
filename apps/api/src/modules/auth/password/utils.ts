const HASH_OPTIONS = {
  algorithm: "argon2id",
  memoryCost: 19456,
  timeCost: 2,
} as const;

const DUMMY_HASH = await Bun.password.hash(
  "dummy-password-for-timing-equalization",
  HASH_OPTIONS,
);

export { HASH_OPTIONS, DUMMY_HASH };
