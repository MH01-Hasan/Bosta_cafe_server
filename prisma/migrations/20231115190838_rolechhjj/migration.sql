/*
  Warnings:

  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "RoleUser" AS ENUM ('admin', 'user');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
ADD COLUMN     "role" "RoleUser" NOT NULL DEFAULT 'admin';

-- DropEnum
DROP TYPE "UserRole";
