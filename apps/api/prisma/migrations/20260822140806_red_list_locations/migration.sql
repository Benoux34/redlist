-- CreateTable
CREATE TABLE "red_list_locations" (
    "assessmentId" INTEGER NOT NULL,
    "countryCode" CHAR(2) NOT NULL,

    CONSTRAINT "red_list_locations_pkey" PRIMARY KEY ("assessmentId","countryCode")
);

-- CreateIndex
CREATE INDEX "red_list_locations_countryCode_idx" ON "red_list_locations"("countryCode");

-- AddForeignKey
ALTER TABLE "red_list_locations" ADD CONSTRAINT "red_list_locations_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "red_list_assessments"("assessmentId") ON DELETE CASCADE ON UPDATE CASCADE;
