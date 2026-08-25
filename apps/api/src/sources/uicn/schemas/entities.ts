import type { z } from "zod";
import type { iucnAssessment, assessmentListResponse } from "./assessment";
import type { assessmentDetailResponse } from "./detail";
import type { countryAssessmentsResponse } from "./country";
import type { redListVersionResponse } from "./version";

type IucnAssessment = z.infer<typeof iucnAssessment>;
type IucnAssessmentDetail = z.infer<typeof assessmentDetailResponse>;
type IucnAssessmentList = z.infer<typeof assessmentListResponse>;
type IucnCountryAssessments = z.infer<typeof countryAssessmentsResponse>;
type IucnRedListVersion = z.infer<typeof redListVersionResponse>;

export type {
  IucnAssessment,
  IucnAssessmentDetail,
  IucnAssessmentList,
  IucnCountryAssessments,
  IucnRedListVersion,
};
