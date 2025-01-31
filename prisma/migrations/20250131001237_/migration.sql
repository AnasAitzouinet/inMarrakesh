/*
  Warnings:

  - You are about to drop the column `Video` on the `Activities` table. All the data in the column will be lost.
  - You are about to drop the column `dateFrom` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `Video` on the `Trips` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Activities" DROP COLUMN "Video";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "dateFrom",
ADD COLUMN     "activitiesId" TEXT,
ADD COLUMN     "adults" INTEGER,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPickup" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "kids" INTEGER,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "pickUpPlace" TEXT;

-- AlterTable
ALTER TABLE "Trips" DROP COLUMN "Video",
ADD COLUMN     "includes" TEXT,
ADD COLUMN     "overview" TEXT;

-- CreateTable
CREATE TABLE "wishlist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tripId" TEXT,
    "activityId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wishlist_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trips"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_activitiesId_fkey" FOREIGN KEY ("activitiesId") REFERENCES "Activities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
