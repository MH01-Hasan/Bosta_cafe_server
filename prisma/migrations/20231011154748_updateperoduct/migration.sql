/*
  Warnings:

  - The `productImage` column on the `products` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "products" ALTER COLUMN "price" SET DATA TYPE TEXT,
ALTER COLUMN "discount" DROP DEFAULT,
ALTER COLUMN "discount" SET DATA TYPE TEXT,
DROP COLUMN "productImage",
ADD COLUMN     "productImage" TEXT[];
