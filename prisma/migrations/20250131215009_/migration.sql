/*
  Warnings:

  - You are about to drop the `wishlist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "wishlist" DROP CONSTRAINT "wishlist_activityId_fkey";

-- DropForeignKey
ALTER TABLE "wishlist" DROP CONSTRAINT "wishlist_tripId_fkey";

-- DropForeignKey
ALTER TABLE "wishlist" DROP CONSTRAINT "wishlist_userId_fkey";

-- AlterTable
ALTER TABLE "Activities" ADD COLUMN     "excludes" TEXT,
ADD COLUMN     "includes" TEXT,
ADD COLUMN     "itinerary" TEXT[],
ADD COLUMN     "overview" TEXT;

-- AlterTable
ALTER TABLE "Trips" ADD COLUMN     "excludes" TEXT,
ADD COLUMN     "itinerary" TEXT[];

-- DropTable
DROP TABLE "wishlist";
