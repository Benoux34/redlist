import { z } from "zod";

const redListVersionResponse = z.object({
  red_list_version: z.string(),
});

export { redListVersionResponse };
