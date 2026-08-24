-- CreateTable
CREATE TABLE "favorites" (
    "userId" UUID NOT NULL,
    "assessmentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoryAtAdd" TEXT NOT NULL,
    "versionAtAdd" TEXT NOT NULL,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("userId","assessmentId")
);

-- CreateIndex
CREATE INDEX "favorites_userId_createdAt_idx" ON "favorites"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "red_list_assessments"("assessmentId") ON DELETE CASCADE ON UPDATE CASCADE;
