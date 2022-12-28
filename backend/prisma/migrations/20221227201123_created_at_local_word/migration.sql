/*
  Warnings:

  - Made the column `lastUpdateLocal` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `createdAtLocal` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "lastUpdateLocal" SET NOT NULL;

-- AlterTable
ALTER TABLE "Word" ADD COLUMN     "createdAtLocal" TEXT NOT NULL;
