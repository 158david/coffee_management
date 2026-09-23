-- CreateTable
CREATE TABLE `RecipeIngredient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `ingredientId` INTEGER NOT NULL,
    `quantity` DECIMAL(65, 30) NOT NULL,

    UNIQUE INDEX `RecipeIngredient_productId_ingredientId_key`(`productId`, `ingredientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RecipeIngredient` ADD CONSTRAINT `RecipeIngredient_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipeIngredient` ADD CONSTRAINT `RecipeIngredient_ingredientId_fkey` FOREIGN KEY (`ingredientId`) REFERENCES `Ingredient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
