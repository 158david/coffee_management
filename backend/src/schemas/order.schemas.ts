import { z } from "zod";

export const createOrderSchema = z.object({
    status: z.string().optional()
});

export const orderIdSchema = z.coerce.number().int().positive();

export const createOrderItemSchema = z.object({
    productId: z.number().int().positive(),
    quantity: z.number().int().positive()
});

export const updateOrderItemSchema = z.object({
    quantity: z.number().int().positive()
});

export const updateOrderSchema = z.object({
    status: z.enum(["PENDING", "COMPLETED", "CANCELED"])
});