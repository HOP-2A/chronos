/*
  Warnings:

  - A unique constraint covering the columns `[clerkId]` on the table `Worker` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerkId` to the `Worker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Worker" ADD COLUMN     "clerkId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Worker_clerkId_key" ON "Worker"("clerkId");
