/*
  Warnings:

  - A unique constraint covering the columns `[clerkId]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "clerkId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_clerkId_key" ON "Admin"("clerkId");
