/*
  Warnings:

  - You are about to drop the column `canPickup` on the `Activities` table. All the data in the column will be lost.
  - You are about to drop the column `options` on the `Activities` table. All the data in the column will be lost.
  - You are about to drop the column `canPickup` on the `Trips` table. All the data in the column will be lost.
  - You are about to drop the column `options` on the `Trips` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Activities" DROP COLUMN "canPickup",
DROP COLUMN "options";

-- AlterTable
ALTER TABLE "Trips" DROP COLUMN "canPickup",
DROP COLUMN "options";

-- CreateTable
CREATE TABLE "Options" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "price" TEXT,
    "canPickup" BOOLEAN,
    "isPrivate" BOOLEAN,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tripsId" TEXT,
    "activitiesId" TEXT,

    CONSTRAINT "Options_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Options" ADD CONSTRAINT "Options_tripsId_fkey" FOREIGN KEY ("tripsId") REFERENCES "Trips"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Options" ADD CONSTRAINT "Options_activitiesId_fkey" FOREIGN KEY ("activitiesId") REFERENCES "Activities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
