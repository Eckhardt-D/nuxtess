/*
  Warnings:

  - You are about to drop the column `twoFactorSecret` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `twoFactorSecret`;

-- CreateTable
CREATE TABLE `TwoFactorSettings` (
    `id` VARCHAR(191) NOT NULL,
    `secret` VARCHAR(32) NOT NULL,
    `uri` VARCHAR(191) NOT NULL,
    `qr` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TwoFactorSettings_secret_key`(`secret`),
    UNIQUE INDEX `TwoFactorSettings_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TwoFactorSettings` ADD CONSTRAINT `TwoFactorSettings_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
