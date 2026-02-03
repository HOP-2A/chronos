-- DropForeignKey
ALTER TABLE "Worker" DROP CONSTRAINT "Worker_companyId_fkey";

-- AlterTable
ALTER TABLE "Worker" ALTER COLUMN "companyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Worker" ADD CONSTRAINT "Worker_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
