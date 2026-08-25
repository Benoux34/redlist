import { z } from "zod";

const assessmentParams = z.object({
  assessmentId: z.coerce.number().int().positive(),
});

export { assessmentParams };
