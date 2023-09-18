/*
  Warnings:

  - You are about to drop the column `parking_places_id` on the `parking_spots` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "parking_spots" DROP CONSTRAINT "parking_spots_parking_places_id_fkey";

-- AlterTable
ALTER TABLE "parking_spots" DROP COLUMN "parking_places_id";

-- AddForeignKey
ALTER TABLE "parking_spots" ADD CONSTRAINT "parking_spots_id_parking_place_fkey" FOREIGN KEY ("id_parking_place") REFERENCES "parking_places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
