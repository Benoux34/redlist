-- CreateTable
CREATE TABLE "identification_queries" (
    "id" UUID NOT NULL,
    "normalizedText" TEXT NOT NULL,
    "candidates" TEXT[],
    "provider" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "hitCount" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "identification_queries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "identification_queries_normalizedText_key" ON "identification_queries"("normalizedText");
