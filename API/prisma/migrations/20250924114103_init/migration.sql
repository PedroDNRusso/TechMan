/*
  Warnings:

  - You are about to drop the `paciente` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `paciente`;

-- CreateTable
CREATE TABLE `Usiuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `senha` INTEGER NOT NULL,
    `tipo` ENUM('ADMIN', 'CLIENTE') NOT NULL DEFAULT 'CLIENTE',

    UNIQUE INDEX `Usiuario_senha_key`(`senha`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
