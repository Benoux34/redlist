import type { IucnAssessment } from "@/sources";

const CATEGORIES = ["EX", "EW", "CR", "EN", "VU"] as const;
const GLOBAL_SCOPE_CODE = 1;
const MAX_PAGES_PER_CATEGORY = 200;
const DB_BATCH_SIZE = 25;

function toRow(assessment: IucnAssessment, redListVersion: string) {
  return {
    assessmentId: assessment.assessment_id,
    sisTaxonId: assessment.sis_taxon_id ?? null,
    scientificName: assessment.taxon_scientific_name,
    categoryCode: assessment.red_list_category_code,
    scopeCode: Number(assessment.scopes[0]?.code ?? GLOBAL_SCOPE_CODE),
    criteria: assessment.criteria ?? null,
    yearPublished: assessment.year_published ?? null,
    assessmentDate: assessment.assessment_date ?? null,
    possiblyExtinct: assessment.possibly_extinct ?? false,
    officialUrl: assessment.url ?? null,
    redListVersion,
  };
}

export {
  CATEGORIES,
  GLOBAL_SCOPE_CODE,
  MAX_PAGES_PER_CATEGORY,
  DB_BATCH_SIZE,
  toRow,
};
