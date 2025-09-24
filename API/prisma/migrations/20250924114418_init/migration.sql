/*
  Warnings:

  - You are about to drop the `usiuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `usiuario`;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `senha` INTEGER NOT NULL,
    `tipo` ENUM('ADMIN', 'CLIENTE') NOT NULL DEFAULT 'CLIENTE',

    UNIQUE INDEX `Usuario_senha_key`(`senha`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
