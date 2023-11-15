/*
  Warnings:

  - The values [user] on the enum `RoleUser` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RoleUser_new" AS ENUM ('admin', 'seller');
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "RoleUser_new" USING ("role"::text::"RoleUser_new");
ALTER TYPE "RoleUser" RENAME TO "RoleUser_old";
ALTER TYPE "RoleUser_new" RENAME TO "RoleUser";
DROP TYPE "RoleUser_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'admin';
COMMIT;
