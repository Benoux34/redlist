import z from "zod";

const MAX_RETRIES = 3;

const USER_AGENT = "freedom/0.1 (benoitantunes34130@gmail.com)";

const summaryResponse = z.object({
  type: z.string(),
  title: z.string(),
  extract: z.string().nullish(),
  thumbnail: z.object({ source: z.string() }).nullish(),
});

export { MAX_RETRIES, USER_AGENT, summaryResponse };
