-- CreateEnum
CREATE TYPE "WorkerRequest" AS ENUM ('PENDING', 'REJECTED', 'ACCEPTED');

-- AlterTable
ALTER TABLE "Worker" ADD COLUMN     "status" "WorkerRequest" NOT NULL DEFAULT 'PENDING';
