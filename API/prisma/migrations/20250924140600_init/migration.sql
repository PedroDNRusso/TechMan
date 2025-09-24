-- DropForeignKey
ALTER TABLE `comentario` DROP FOREIGN KEY `Comentario_equipamentoId_fkey`;

-- DropForeignKey
ALTER TABLE `comentario` DROP FOREIGN KEY `Comentario_usuarioId_fkey`;

-- DropIndex
DROP INDEX `Comentario_equipamentoId_fkey` ON `comentario`;

-- DropIndex
DROP INDEX `Comentario_usuarioId_fkey` ON `comentario`;

-- AddForeignKey
ALTER TABLE `Comentario` ADD CONSTRAINT `Comentario_equipamentoId_fkey` FOREIGN KEY (`equipamentoId`) REFERENCES `Equipamento`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comentario` ADD CONSTRAINT `Comentario_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
