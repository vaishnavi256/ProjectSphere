/*
  Warnings:

  - You are about to alter the column `comment` on the `Idea` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `Idea` MODIFY `comment` JSON NOT NULL;
