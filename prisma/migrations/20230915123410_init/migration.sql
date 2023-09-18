/*
  Warnings:

  - You are about to drop the column `capacity` on the `parking_spots` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `parking_spots` table. All the data in the column will be lost.
  - Added the required column `id_parking_place` to the `parking_spots` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `parking_spots` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parking_places_id` to the `parking_spots` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parking_place_id` to the `reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "parking_spots" DROP COLUMN "capacity",
DROP COLUMN "location",
ADD COLUMN     "id_parking_place" INTEGER NOT NULL,
ADD COLUMN     "id_user" INTEGER NOT NULL,
ADD COLUMN     "parking_places_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "reservation" ADD COLUMN     "parking_place_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "parking_places" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parking_places_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "parking_spots" ADD CONSTRAINT "parking_spots_parking_places_id_fkey" FOREIGN KEY ("parking_places_id") REFERENCES "parking_places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parking_spots" ADD CONSTRAINT "parking_spots_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_parking_place_id_fkey" FOREIGN KEY ("parking_place_id") REFERENCES "parking_places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
