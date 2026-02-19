-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "SalePrice" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "sale" (
    "id" SERIAL NOT NULL,
    "discountPercentage" DOUBLE PRECISION NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductTosale" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ProductTosale_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ProductTosale_B_index" ON "_ProductTosale"("B");

-- AddForeignKey
ALTER TABLE "_ProductTosale" ADD CONSTRAINT "_ProductTosale_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductTosale" ADD CONSTRAINT "_ProductTosale_B_fkey" FOREIGN KEY ("B") REFERENCES "sale"("id") ON DELETE CASCADE ON UPDATE CASCADE;
