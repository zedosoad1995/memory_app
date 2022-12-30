/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `Collection` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,userId,collectionId]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Collection_name_key";

-- DropIndex
DROP INDEX "Tag_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Collection_name_userId_key" ON "Collection"("name", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_userId_collectionId_key" ON "Tag"("name", "userId", "collectionId");
