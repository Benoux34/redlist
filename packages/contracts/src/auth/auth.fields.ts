import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email({ message: "Invalid email" })
  .max(254);

const passwordSchema = z
  .string()
  .min(12, "12 characters minimum")
  .max(128, "128 characters maximum");

const pseudoSchema = z
  .string()
  .trim()
  .min(3, "3 characters minimum")
  .max(20, "20 characters maximum")
  .regex(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, hyphens and underscores");

export { emailSchema, passwordSchema, pseudoSchema };
