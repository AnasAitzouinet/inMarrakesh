/*
  Warnings:

  - You are about to drop the `Reservation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_activitiesId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_userId_fkey";

-- DropTable
DROP TABLE "Reservation";

-- CreateTable
CREATE TABLE "Reservations" (
    "id" TEXT NOT NULL,
    "tripId" TEXT,
    "activityId" TEXT,
    "dateTo" TIMESTAMP(3),
    "phoneNumber" TEXT,
    "email" TEXT,
    "name" TEXT,
    "kids" INTEGER,
    "adults" INTEGER,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "isPickup" BOOLEAN NOT NULL DEFAULT false,
    "pickUpPlace" TEXT,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "activitiesId" TEXT,
    "tripsId" TEXT,

    CONSTRAINT "Reservations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reservations" ADD CONSTRAINT "Reservations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservations" ADD CONSTRAINT "Reservations_activitiesId_fkey" FOREIGN KEY ("activitiesId") REFERENCES "Activities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservations" ADD CONSTRAINT "Reservations_tripsId_fkey" FOREIGN KEY ("tripsId") REFERENCES "Trips"("id") ON DELETE SET NULL ON UPDATE CASCADE;
