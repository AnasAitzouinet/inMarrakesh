-- AlterTable
ALTER TABLE "Options" ADD COLUMN     "time" TEXT;

-- AlterTable
ALTER TABLE "Reservations" ADD COLUMN     "optionsId" TEXT;

-- AddForeignKey
ALTER TABLE "Reservations" ADD CONSTRAINT "Reservations_optionsId_fkey" FOREIGN KEY ("optionsId") REFERENCES "Options"("id") ON DELETE SET NULL ON UPDATE CASCADE;
