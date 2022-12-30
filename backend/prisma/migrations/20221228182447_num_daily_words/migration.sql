/*
  Warnings:

  - Added the required column `numDailyWords` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "numDailyWords" INTEGER NOT NULL;
