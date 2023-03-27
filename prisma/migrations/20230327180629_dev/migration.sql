/*
  Warnings:

  - You are about to drop the column `companyId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_companyId_fkey`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `companyId`,
    ADD COLUMN `employeeCompanyId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_employeeCompanyId_fkey` FOREIGN KEY (`employeeCompanyId`) REFERENCES `Company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
