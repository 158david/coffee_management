import { z } from "zod";

export const createRecipeIngredientSchema = z.object({
    productId: z.number().int().positive(),
    ingredientId: z.number().int().positive(),
    quantity: z.number().positive()
});

export const updateRecipeIngredientSchema = z.object({
    quantity: z.number().positive().optional()
});

export const recipeIngredientIdSchema = 
    z.coerce.number().int().positive();