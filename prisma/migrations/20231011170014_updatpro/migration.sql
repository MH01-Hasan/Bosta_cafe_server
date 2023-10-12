/*
  Warnings:

  - You are about to drop the column `productImage` on the `products` table. All the data in the column will be lost.
  - Added the required column `imageId` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "productImage",
ADD COLUMN     "imageId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Imagedata" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "bytes" INTEGER NOT NULL,
    "fileType" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Imagedata_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Imagedata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
