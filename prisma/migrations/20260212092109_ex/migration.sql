/*
  Warnings:

  - The `startTime` column on the `TimeSchedule` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `endTime` column on the `TimeSchedule` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "TimeSchedule" DROP CONSTRAINT "TimeSchedule_workerId_fkey";

-- AlterTable
ALTER TABLE "TimeSchedule" ALTER COLUMN "workerId" DROP NOT NULL,
DROP COLUMN "startTime",
ADD COLUMN     "startTime" TIMESTAMP(3)[],
DROP COLUMN "endTime",
ADD COLUMN     "endTime" TIMESTAMP(3)[];

-- AlterTable
ALTER TABLE "Worker" ALTER COLUMN "experience" SET NOT NULL,
ALTER COLUMN "experience" SET DATA TYPE TEXT,
ALTER COLUMN "clerkId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TimeSchedule" ADD CONSTRAINT "TimeSchedule_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE SET NULL ON UPDATE CASCADE;
