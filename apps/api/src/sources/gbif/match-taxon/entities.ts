import { matchResponse } from "./utils";
import z from "zod";

type GbifMatch = z.infer<typeof matchResponse>;

export type { GbifMatch };
