import type { z } from "zod";
import type { iucnAssessment } from "./index";

type IucnAssessment = z.infer<typeof iucnAssessment>;

export type { IucnAssessment };
