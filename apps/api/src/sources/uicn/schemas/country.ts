import { z } from "zod";
import { enDescription } from "./common";

const countryAssessmentsResponse = z.object({
  country: z
    .object({
      code: z.string().nullish(),
      description: enDescription,
    })
    .nullish(),
  assessments: z
    .array(
      z.object({
        assessment_id: z.number().int(),
        red_list_category_code: z.string(),
      }),
    )
    .default([]),
});

export { countryAssessmentsResponse };
