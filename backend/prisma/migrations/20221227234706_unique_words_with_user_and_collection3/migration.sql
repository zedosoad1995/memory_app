/*
  Warnings:

  - A unique constraint covering the columns `[word,userId,collectionId]` on the table `Word` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Word_word_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Word_word_userId_collectionId_key" ON "Word"("word", "userId", "collectionId");
