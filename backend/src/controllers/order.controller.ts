import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma.js";
import { 
    createOrderSchema,
    createOrderItemSchema,
    updateOrderItemSchema,
    orderIdSchema
 } from "../schemas/order.schemas.js";

export const getOrders = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });

        res.json(orders);
    } catch (error) {
        next(error);
    }
};

export const createOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = createOrderSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Datele comenzii sunt invalide",
                errors: result.error.issues
            });
        }

        const order = await prisma.order.create({
            data: result.data
        });

        res.status(201).json(order);
    } catch (error) {
        next (error);
    }
};

export const createOrderItem = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const orderIdResult = orderIdSchema.safeParse(req.params.id);

        if (!orderIdResult.success) {
            return res.status(400).json({
                message: "ID-ul comenzii este invalid"
            });
        }

        const dataResult = createOrderItemSchema.safeParse(req.body);

        if (!dataResult.success) {
            return res.status(400).json({
                message: "Datele produsului sunt invalide",
                errors: dataResult.error.issues
            });
        }

        const order = await prisma.order.findUnique({
            where: { id: orderIdResult.data }
        });

        if (!order) {
            return res.status(404).json({
                message: "Comanda nu a fost gasita"
            });
        }

        const product = await prisma.product.findUnique({
            where: { id: dataResult.data.productId }
        });

        if (!product) {
            return res.status(400).json({
                message: "Produsul specificat nu exista"
            });
        }

        const orderItem = await prisma.orderItem.create({
            data: {
                orderId: order.id,
                productId: product.id,
                quantity: dataResult.data.quantity,
                unitPrice: product.price
            }
        });

        res.status(201).json(orderItem);
    } catch (error) {
        next (error);
    }
};

export const getOrderItems = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const orderIdResult = orderIdSchema.safeParse(req.params.id);

        if (!orderIdResult.success) {
            return res.status(400).json({
                message: "ID-ul comenzii este invalid"
            });
        }

        const order = await prisma.order.findUnique({
            where: { id: orderIdResult.data }
        });

        if (!order) {
            return res.status(404).json({
                message: "Comanda nu a fost gasita"
            });
        }

        const orderItems = await prisma.orderItem.findMany({
            where: {
                orderId: order.id 
            },
            include: {
                product: true 
            }
        });

        res.json(orderItems);
    } catch (error) {
        next(error);
    }
};

export const updateOrderItem = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const orderIdResult = orderIdSchema.safeParse(req.params.id);
        const itemIdResult = orderIdSchema.safeParse(req.params.itemId);

        if (!orderIdResult.success || !itemIdResult.success) {
            return res.status(400).json({
                message: "ID-ul comenzii sau al produsului este invalid"
            });
        }

        const dataResult = updateOrderItemSchema.safeParse(req.body);

        if (!dataResult.success) {
            return res.status(400).json({
                message: "Datele produsului sunt invalide",
                errors: dataResult.error.issues
            });
        }

        const orderItem = await prisma.orderItem.findFirst({
            where: {
                id: itemIdResult.data,
                orderId: orderIdResult.data
            }
        });

        if (!orderItem) {
            return res.status(404).json({
                message: "Produsul nu a fost gasit in aceasta comanda"
            });
        }

        const updatedOrderItem = await prisma.orderItem.update({
            where: {
                id: itemIdResult.data
            },
            data: dataResult.data
        });

        res.json(updatedOrderItem);
    } catch (error) {
        next (error);
    }
};

export const deleteOrderItem = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const orderIdResult = orderIdSchema.safeParse(req.params.id);
        const itemIdResult = orderIdSchema.safeParse(req.params.itemId);

        if (!orderIdResult.success || !itemIdResult.success) {
            return res.status(400).json({
                message:"ID-ul comenzii sau al produsului este invalid"
            });
        }

        const orderItem = await prisma.orderItem.findFirst({
            where: {
                id: itemIdResult.data,
                orderId: orderIdResult.data
            }
        });

        if (!orderItem) {
            return res.status(404).json({
                message:"Produsul nu a fost gasit in aceasta comanda"
            });
        }

        await prisma.orderItem.delete({
            where: {
                id: itemIdResult.data
            }
        });

        res.status(204).send();
    }catch (error) {
        next(error);
    }
};