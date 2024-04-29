-- CreateTable
CREATE TABLE `task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(45) NOT NULL,
    `completed` TINYINT NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `fk_task_user1_idx`(`user_id`),
    PRIMARY KEY (`id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(45) NOT NULL,
    `password` VARCHAR(45) NOT NULL,
    `first_name` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `fk_task_user1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
