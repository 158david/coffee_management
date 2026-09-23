import { z } from "zod";

export const createCategorySchema = z.object({
    name: z.string().min(2, "Numele categoriei trebuie sa aiba cel putin 2 caractere"),
    description: z.string().optional()
});

export const updateCategorySchema = z.object({
    name: z.string().min(2, "Numele categoriei trebuie sa aiba cel putin 2 caractere").optional(),
    description: z.string().optional()
});

export const categoryIdSchema = z.coerce.number().int().positive();