/*
  Warnings:

  - Added the required column `productImage` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "productImage" TEXT NOT NULL;
