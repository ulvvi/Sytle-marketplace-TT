/*
  Warnings:

  - The values [BEST_SELLER,NEW,SALE,PREMIUM,LIMITED_TIME,FLASH_SALE,LUXURY_SALE,SUMMER_SALE,SPORT_SALE,OUT_OF_STOCK] on the enum `CategoryType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CategoryType_new" AS ENUM ('TOPS', 'BOTTOMS', 'SHOES', 'DRESSES', 'ACCESSORIES');
ALTER TABLE "Category" ALTER COLUMN "type" TYPE "CategoryType_new" USING ("type"::text::"CategoryType_new");
ALTER TYPE "CategoryType" RENAME TO "CategoryType_old";
ALTER TYPE "CategoryType_new" RENAME TO "CategoryType";
DROP TYPE "public"."CategoryType_old";
COMMIT;
