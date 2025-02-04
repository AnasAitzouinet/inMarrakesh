-- AlterTable
ALTER TABLE "Activities" ADD COLUMN     "canPickup" BOOLEAN,
ADD COLUMN     "duration" TEXT,
ADD COLUMN     "options" TEXT[];

-- AlterTable
ALTER TABLE "Trips" ADD COLUMN     "canPickup" BOOLEAN,
ADD COLUMN     "duration" TEXT,
ADD COLUMN     "options" TEXT[];
