-- AlterTable
ALTER TABLE "red_list_assessments" ADD COLUMN     "mediaFetchedAt" TIMESTAMPTZ(3),
ADD COLUMN     "photoAttribution" TEXT,
ADD COLUMN     "photoLicense" TEXT,
ADD COLUMN     "photoUrl" TEXT,
ADD COLUMN     "vernacularNameFr" TEXT;
