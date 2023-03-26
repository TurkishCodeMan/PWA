/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Company` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Company` DROP FOREIGN KEY `Company_ownerId_fkey`;

-- AlterTable
ALTER TABLE `Company` DROP COLUMN `ownerId`;

-- CreateTable
CREATE TABLE `_CompanyToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CompanyToUser_AB_unique`(`A`, `B`),
    INDEX `_CompanyToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CompanyToUser` ADD CONSTRAINT `_CompanyToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CompanyToUser` ADD CONSTRAINT `_CompanyToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
