/*
  Warnings:

  - You are about to drop the `_ProductTosale` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProductTosale" DROP CONSTRAINT "_ProductTosale_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductTosale" DROP CONSTRAINT "_ProductTosale_B_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "saleId" INTEGER;

-- DropTable
DROP TABLE "_ProductTosale";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "sale"("id") ON DELETE SET NULL ON UPDATE CASCADE;
