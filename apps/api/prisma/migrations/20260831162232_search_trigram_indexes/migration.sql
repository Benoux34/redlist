-- gin_trgm_ops lives in pg_trgm; the index creation below fails without it.
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- CreateIndex
CREATE INDEX "red_list_assessments_scientificName_idx" ON "red_list_assessments" USING GIN ("scientificName" gin_trgm_ops);

-- CreateIndex
CREATE INDEX "red_list_assessments_vernacularNameFr_idx" ON "red_list_assessments" USING GIN ("vernacularNameFr" gin_trgm_ops);
