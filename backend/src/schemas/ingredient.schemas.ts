import { z } from "zod";

export const createIngredientSchema = z.object({
    name: z.string().min(2),
    unit: z.string().min(1),
    quantity: z.number().nonnegative().default(0),
    minimumStock: z.number().nonnegative().default(0),
    active: z.boolean().default(true)
});

export const updateIngredientSchema = z.object({
    name: z.string().min(2).optional(),
    unit: z.string().min(1).optional(),
    quantity: z.number().nonnegative().optional(),
    minimumStock: z.number().nonnegative().optional(),
    active: z.boolean().optional()
});


export const IngredientSchema = 
z.coerce.number().int().positive();