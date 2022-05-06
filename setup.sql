CREATE DATABASE IF NOT EXISTS mysqldb;
CREATE DATABASE IF NOT EXISTS mysqldbshadow;

USE mysqldb;
-- CreateTable
CREATE TABLE `PokemonDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shakespeareTranslations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `input` VARCHAR(191) NOT NULL,
    `output` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE mysqldbshadow;

-- CreateTable
CREATE TABLE `PokemonDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shakespeareTranslations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `input` VARCHAR(191) NOT NULL,
    `output` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
