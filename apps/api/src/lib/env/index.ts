import { z } from "zod";

const envSchema = z
  .object({
    NODE_ENV: z.enum(["development", "production", "test"]),
    PORT: z.coerce.number().int().positive().default(3000),
    DATABASE_URL: z.url(),
    WEB_ORIGIN: z.url(),
    // Only enable behind a reverse proxy that overwrites X-Real-IP.
    TRUST_PROXY: z.stringbool().default(false),
    IUCN_API_TOKEN: z.string().min(1),
    IUCN_API_BASE_URL: z.url(),
    IUCN_CONTACT_EMAIL: z.email(),
  })
  .refine(
    (value) =>
      value.NODE_ENV !== "production" ||
      value.WEB_ORIGIN.startsWith("https://"),
    {
      path: ["WEB_ORIGIN"],
      message:
        "WEB_ORIGIN must use https in production (the session cookie is Secure).",
    },
  );

const env = envSchema.parse(process.env);
const isProduction = env.NODE_ENV === "production";

export { env, isProduction };
