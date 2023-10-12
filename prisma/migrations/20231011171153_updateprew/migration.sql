/*
  Warnings:

  - You are about to drop the column `imageId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `Imagedata` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productImage` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_imageId_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "imageId",
ADD COLUMN     "productImage" JSONB NOT NULL;

-- DropTable
DROP TABLE "Imagedata";
