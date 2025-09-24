-- CreateTable
CREATE TABLE `Paciente` (
    `id` INTEGER NOT NULL,
    `senha` INTEGER NOT NULL,
    `tipo` ENUM('ADMIN', 'CLIENTE') NOT NULL,

    UNIQUE INDEX `Paciente_senha_key`(`senha`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
