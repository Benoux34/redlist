import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.url(),
  WEB_ORIGIN: z.url(),
  IUCN_API_TOKEN: z.string().min(1),
  IUCN_API_BASE_URL: z.url(),
  IUCN_CONTACT_EMAIL: z.email(),
});

const env = envSchema.parse(process.env);
const isProduction = env.NODE_ENV === "production";

export { env, isProduction };
