/*
  Warnings:

  - You are about to drop the column `endTime` on the `BlockedTime` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `BlockedTime` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `BlockedTime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `BlockedTime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BlockedTime" DROP COLUMN "endTime",
DROP COLUMN "startTime",
ADD COLUMN     "endDate" DATE NOT NULL,
ADD COLUMN     "startDate" DATE NOT NULL;

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "endTime",
DROP COLUMN "startTime",
ADD COLUMN     "endDate" DATE NOT NULL,
ADD COLUMN     "startDate" DATE NOT NULL;
