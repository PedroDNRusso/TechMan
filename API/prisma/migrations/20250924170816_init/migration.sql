/*
  Warnings:

  - You are about to drop the column `tipo` on the `usuario` table. All the data in the column will be lost.
  - Added the required column `perfilId` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Usuario_senha_key` ON `usuario`;

-- AlterTable
ALTER TABLE `equipamento` ADD COLUMN `ativo` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `tipo`,
    ADD COLUMN `perfilId` INTEGER NOT NULL,
    MODIFY `senha` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Perfil` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `perfil` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_perfilId_fkey` FOREIGN KEY (`perfilId`) REFERENCES `Perfil`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
