-- AlterTable
ALTER TABLE "red_list_assessments" ADD COLUMN     "className" TEXT,
ADD COLUMN     "family" TEXT,
ADD COLUMN     "gbifUsageKey" INTEGER,
ADD COLUMN     "kingdom" TEXT,
ADD COLUMN     "order" TEXT,
ADD COLUMN     "phylum" TEXT,
ADD COLUMN     "taxonomyFetchedAt" TIMESTAMPTZ(3);

-- CreateIndex
CREATE INDEX "red_list_assessments_className_idx" ON "red_list_assessments"("className");

-- CreateIndex
CREATE INDEX "red_list_assessments_kingdom_idx" ON "red_list_assessments"("kingdom");
