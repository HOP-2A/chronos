/*
  Warnings:

  - Made the column `openTime` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `closeTime` on table `Company` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('BOOKED', 'CANCELLED', 'COMPLETED', 'NO_SHOW');

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "openTime" SET NOT NULL,
ALTER COLUMN "openTime" SET DATA TYPE TEXT,
ALTER COLUMN "closeTime" SET NOT NULL,
ALTER COLUMN "closeTime" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "workerId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "status" "AppointmentStatus" NOT NULL DEFAULT 'BOOKED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cancelledAt" TIMESTAMP(3),
    "cancelReason" TEXT,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Appointment_workerId_startAt_idx" ON "Appointment"("workerId", "startAt");

-- CreateIndex
CREATE INDEX "Appointment_userId_startAt_idx" ON "Appointment"("userId", "startAt");

-- CreateIndex
CREATE INDEX "Appointment_companyId_startAt_idx" ON "Appointment"("companyId", "startAt");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
