/*
  Warnings:

  - A unique constraint covering the columns `[word,userId]` on the table `Word` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Word_word_userId_key" ON "Word"("word", "userId");
