/*
  Warnings:

  - A unique constraint covering the columns `[productId,color]` on the table `Variant` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Variant_color_key";

-- CreateIndex
CREATE UNIQUE INDEX "Variant_productId_color_key" ON "Variant"("productId", "color");
