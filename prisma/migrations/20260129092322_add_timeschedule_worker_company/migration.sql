/*
  Warnings:

  - Added the required column `companyId` to the `TimeSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workerId` to the `TimeSchedule` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `startTime` on the `TimeSchedule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endTime` on the `TimeSchedule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "TimeSchedule" ADD COLUMN     "companyId" TEXT NOT NULL,
ADD COLUMN     "workerId" TEXT NOT NULL,
DROP COLUMN "startTime",
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
DROP COLUMN "endTime",
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "TimeSchedule" ADD CONSTRAINT "TimeSchedule_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeSchedule" ADD CONSTRAINT "TimeSchedule_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
