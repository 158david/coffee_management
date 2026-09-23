import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { createProductSchema,
    productIdSchema,
    updateProductSchema
 } from "../schemas/product.schemas.js";

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try { 
    const products = await prisma.product.findMany();

    res.json(products);
} catch (error) {
    next(error);
}
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const result = productIdSchema.safeParse(req.params.id);
    
    if(!result.success) {
        return res.status(400).json({
            message: "ID-ul produsului este invalid"
        });
    }

    const product = await prisma.product.findUnique({
        where: {
            id: result.data
        } 
    });


if (!product) {
    return res.status(404).json({
        message: "Produsul nu a fost gasit"
    });
}

    res.json(product); 
} catch (error) {
            next(error);
        }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const result = createProductSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Date invalide.",
            errors: result.error.issues
        });
    }

    const category = await prisma.category.findUnique({
        where: {
            id: result.data.categoryId
        }
    });

    if (!category) {
        return res.status(400).json({
            message: "Categoria specificata nu exista"
        });
    }

    const product = await prisma.product.create({
        data: result.data
    });
    
    res.status(201).json(product);
} catch (error) {
    next(error);
}
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const idResult = productIdSchema.safeParse(req.params.id);

    if (!idResult.success) {
        return res.status(400).json({
            message: "ID-ul produsului este invalid"
        });
    }

    const dataResult = updateProductSchema.safeParse(req.body);

    if (!dataResult.success) {
        return res.status(400).json({
            message: "Datele produsului sunt invalide",
            errors: dataResult.error.issues
        });
    }
    
    const data = dataResult.data;

    if (data.categoryId !== undefined) {
        const category = await prisma.category.findUnique({
            where: {
                id: data.categoryId
            }
        });

        if (!category) {
            return res.status(400).json({
                message: "Categoria specificata nu exista"
            });
        }
    }

        const product = await prisma.product.update({
            where: {
                id: idResult.data
            },
            data: data
        });
    res.json(product);
    } catch (error){
        next(error);
    }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const idResult = productIdSchema.safeParse(req.params.id);

    if (!idResult.success) {
        return res.status(400).json({
            message: "ID-ul produsului este invalid"
        });
    }

    const product = await prisma.product.findUnique({
        where: {
            id: idResult.data
        }
    });

    if (!product) {
        return res.status(404).json({
            message: "Produsul nu a fost gasit"
        });
    }

    await prisma.product.delete({
        where: {
            id: idResult.data
        }
    });

    res.status(204).send();
} catch (error){
    next(error);
}
}