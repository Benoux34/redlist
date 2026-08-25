import { z } from "zod";

const enDescription = z.object({ en: z.string().nullish() }).nullish();

const iucnScope = z.object({
  code: z.string(),
});

export { enDescription, iucnScope };
