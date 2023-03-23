/*
  Warnings:

  - The primary key for the `Task` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `assigneeId` on the `Task` table. All the data in the column will be lost.
  - The primary key for the `TaskGroup` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,name]` on the table `TaskGroup` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_assigneeId_fkey`;

-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_taskGroupId_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_userId_fkey`;

-- DropForeignKey
ALTER TABLE `accounts` DROP FOREIGN KEY `accounts_userId_fkey`;

-- DropForeignKey
ALTER TABLE `sessions` DROP FOREIGN KEY `sessions_userId_fkey`;

-- AlterTable
ALTER TABLE `Task` DROP PRIMARY KEY,
    DROP COLUMN `assigneeId`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `due` DATETIME(3) NULL,
    ADD COLUMN `ownerId` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` ENUM('NOT_STARTED', 'STARTED', 'COMPLETED') NOT NULL DEFAULT 'NOT_STARTED',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL,
    MODIFY `taskGroupId` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `TaskGroup` DROP PRIMARY KEY,
    ADD COLUMN `userId` VARCHAR(191) NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `verificationtokens` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `verificationtokens_token_key`(`token`),
    UNIQUE INDEX `verificationtokens_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `email_verified` DATETIME(3) NULL,
    `name` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `role` ENUM('EMPLOYER', 'EMPLOYEES', 'PUBLIC') NOT NULL DEFAULT 'PUBLIC',

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Task_ownerId_idx` ON `Task`(`ownerId`);

-- CreateIndex
CREATE INDEX `TaskGroup_userId_id_idx` ON `TaskGroup`(`userId`, `id`);

-- CreateIndex
CREATE UNIQUE INDEX `TaskGroup_userId_name_key` ON `TaskGroup`(`userId`, `name`);

-- AddForeignKey
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskGroup` ADD CONSTRAINT `TaskGroup_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_taskGroupId_fkey` FOREIGN KEY (`taskGroupId`) REFERENCES `TaskGroup`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
