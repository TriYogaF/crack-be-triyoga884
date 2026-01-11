/*
  Warnings:

  - You are about to drop the column `externalId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `method` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CREDIT_CARD', 'TRANSFER');

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "externalId",
DROP COLUMN "provider",
ADD COLUMN     "method" "PaymentMethod" NOT NULL;
