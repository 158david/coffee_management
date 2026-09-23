import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string().min(1, "Numele produsului este obligatoriu."),
    description: z.string().optional(),
    price: z.number().positive("Pretul trebuie sa fie mai mare decat 0."),
    active: z.boolean().optional(),
    categoryId: z.number().int().positive()
});

export const productIdSchema = z.coerce.number().int().positive();

export const updateProductSchema = createProductSchema.partial();