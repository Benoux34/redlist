-- AlterTable
ALTER TABLE "red_list_assessments" ADD COLUMN     "description" TEXT,
ADD COLUMN     "descriptionFetchedAt" TIMESTAMPTZ(3),
ADD COLUMN     "descriptionSource" TEXT;
