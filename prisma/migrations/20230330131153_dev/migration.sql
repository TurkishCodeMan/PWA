/*
  Warnings:

  - A unique constraint covering the columns `[order]` on the table `TaskGroup` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order` to the `TaskGroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TaskGroup` ADD COLUMN `order` INTEGER NOT NULL AUTO_INCREMENT;

-- CreateIndex
CREATE UNIQUE INDEX `TaskGroup_order_key` ON `TaskGroup`(`order`);
