/*
  Warnings:

  - You are about to drop the column `companyId` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Worker` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "WorkerRequestStatus" AS ENUM ('PENDING', 'REJECTED', 'ACCEPTED');

-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_companyId_fkey";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "companyId";

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "adminId" TEXT;

-- AlterTable
ALTER TABLE "Worker" DROP COLUMN "status";

-- DropEnum
DROP TYPE "WorkerRequest";

-- CreateTable
CREATE TABLE "WorkerApplication" (
    "id" TEXT NOT NULL,
    "workerId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "status" "WorkerRequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "decidedAt" TIMESTAMP(3),
    "reason" TEXT,
    "decidedById" TEXT,

    CONSTRAINT "WorkerApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WorkerApplication_companyId_status_idx" ON "WorkerApplication"("companyId", "status");

-- CreateIndex
CREATE INDEX "WorkerApplication_workerId_status_idx" ON "WorkerApplication"("workerId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "WorkerApplication_workerId_companyId_key" ON "WorkerApplication"("workerId", "companyId");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkerApplication" ADD CONSTRAINT "WorkerApplication_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkerApplication" ADD CONSTRAINT "WorkerApplication_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
