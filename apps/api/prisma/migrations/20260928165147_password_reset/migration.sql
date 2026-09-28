-- AlterTable
ALTER TABLE "users" ADD COLUMN     "resetTokenExpiresAt" TIMESTAMPTZ(3),
ADD COLUMN     "resetTokenHash" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_resetTokenHash_key" ON "users"("resetTokenHash");
