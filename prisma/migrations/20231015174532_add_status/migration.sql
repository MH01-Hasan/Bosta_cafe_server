-- CreateEnum
CREATE TYPE "Status" AS ENUM ('open', 'close');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'open';
