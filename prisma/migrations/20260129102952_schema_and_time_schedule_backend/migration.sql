-- DropForeignKey
ALTER TABLE "TimeSchedule" DROP CONSTRAINT "TimeSchedule_companyId_fkey";

-- AlterTable
ALTER TABLE "TimeSchedule" ALTER COLUMN "companyId" DROP NOT NULL,
ALTER COLUMN "startTime" SET DATA TYPE TEXT,
ALTER COLUMN "endTime" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "TimeSchedule" ADD CONSTRAINT "TimeSchedule_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
