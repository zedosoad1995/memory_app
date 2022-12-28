/*
  Warnings:

  - Made the column `lastUpdateLocal` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "lastUpdateLocal" SET NOT NULL,
ALTER COLUMN "timezone" DROP NOT NULL;
