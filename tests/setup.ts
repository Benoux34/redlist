const TEST_ENV: Record<string, string> = {
  NODE_ENV: "test",
  DATABASE_URL: "postgresql://test:test@127.0.0.1:5432/test",
  WEB_ORIGIN: "http://127.0.0.1:5173",
  IUCN_API_TOKEN: "test-token",
  IUCN_API_BASE_URL: "https://api.iucnredlist.org/api/v4",
  CONTACT_EMAIL: "test@example.com",
  SWEEGO_API_KEY: "test-key",
};

for (const [key, value] of Object.entries(TEST_ENV)) process.env[key] ??= value;
