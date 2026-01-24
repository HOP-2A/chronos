/*
  Warnings:

  - You are about to drop the column `companyId` on the `SuperAdmin` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `SuperAdmin` table. All the data in the column will be lost.
  - You are about to drop the column `workerId` on the `SuperAdmin` table. All the data in the column will be lost.
  - Added the required column `clerkid` to the `SuperAdmin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `SuperAdmin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SuperAdmin" DROP COLUMN "companyId",
DROP COLUMN "customerId",
DROP COLUMN "workerId",
ADD COLUMN     "clerkid" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL;
