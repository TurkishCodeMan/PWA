/*
  Warnings:

  - You are about to drop the column `userId` on the `TaskGroup` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[companyId,name]` on the table `TaskGroup` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `TaskGroup` DROP FOREIGN KEY `TaskGroup_userId_fkey`;

-- DropIndex
DROP INDEX `TaskGroup_userId_id_idx` ON `TaskGroup`;

-- DropIndex
DROP INDEX `TaskGroup_userId_name_key` ON `TaskGroup`;

-- AlterTable
ALTER TABLE `TaskGroup` DROP COLUMN `userId`,
    ADD COLUMN `companyId` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `TaskGroup_companyId_id_idx` ON `TaskGroup`(`companyId`, `id`);

-- CreateIndex
CREATE UNIQUE INDEX `TaskGroup_companyId_name_key` ON `TaskGroup`(`companyId`, `name`);

-- AddForeignKey
ALTER TABLE `TaskGroup` ADD CONSTRAINT `TaskGroup_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
