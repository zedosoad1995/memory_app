/*
  Warnings:

  - Added the required column `isSeenToday` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Word" ADD COLUMN     "isSeenToday" BOOLEAN NOT NULL;
