-- CreateTable
CREATE TABLE "red_list_sync" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "redListVersion" TEXT NOT NULL,
    "lastSyncedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "red_list_sync_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "red_list_assessments" (
    "assessmentId" INTEGER NOT NULL,
    "sisTaxonId" INTEGER,
    "scientificName" TEXT NOT NULL,
    "categoryCode" TEXT NOT NULL,
    "scopeCode" INTEGER NOT NULL,
    "criteria" TEXT,
    "yearPublished" INTEGER,
    "assessmentDate" TIMESTAMPTZ(3),
    "possiblyExtinct" BOOLEAN NOT NULL DEFAULT false,
    "officialUrl" TEXT,
    "redListVersion" TEXT NOT NULL,
    "detail" JSONB,
    "detailFetchedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "red_list_assessments_pkey" PRIMARY KEY ("assessmentId")
);

-- CreateIndex
CREATE INDEX "red_list_assessments_categoryCode_scientificName_idx" ON "red_list_assessments"("categoryCode", "scientificName");
