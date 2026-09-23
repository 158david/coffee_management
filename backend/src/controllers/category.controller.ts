import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma.js";
import { 
    createCategorySchema,
    updateCategorySchema,
    categoryIdSchema
} from "../schemas/category.schemas.js";
import { updateProduct } from "./product.controller.js";

export const getCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const categories = await prisma.category.findMany();

            res.json(categories);
     } catch (error) {
            next(error);
        }
    };
    
    export const createCategory = async (
        req: Request,
        res: Response,
        next:NextFunction
    ) => {
        try {
        const result = createCategorySchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Date invalide",
                errors: result.error.issues
            });
        }

        const category = await prisma.category.create({
            data: result.data
        });

        res.status(201).json(category);
    } catch (error) {
        next(error);
    }
};

export const getCategoryById = async (
    req: Request,
    res: Response, 
    next: NextFunction
 ) => {
    try {
        const result = categoryIdSchema.safeParse(req.params.id);

        if (!result.success) {
            return res.status(400).json({
                message: "ID-ul categoriei este invalid"
            });
        }

        const category = await prisma.category.findUnique({
            where: {
                id: result.data
            }
        });

        if (!category) {
            return res.status(404).json({
                message: "Categoria nu a fost gasita"
            });
        }

        res.json(category);
    } catch (error) {
        next(error);
    }
};

export const updateCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const idResult = categoryIdSchema.safeParse(req.params.id);

        if (!idResult.success) {
            return res.status(400).json({
                message: "ID-ul categoriei este invalid"
            });
        }

        const dataResult = updateCategorySchema.safeParse(req.body);

        if (!dataResult.success) {
            return res.status(400).json({
                message: "Datele categoriei sunt invalide",
                errors: dataResult.error.issues
            });
        }

        const category = await prisma.category.findUnique({
            where: {
                id: idResult.data
            }
        });
    
        if (!category) {
            return res.status(404).json({
                message: "Categoria nu a fost gasita"
            });
        }
         
        const updatedCategory = await prisma.category.update({
            where: {
                id: idResult.data
            },
            data: dataResult.data
        });

        res.json(updatedCategory);
    } catch (error) {
        next(error);
    }
};

export const deleteCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const idResult = categoryIdSchema.safeParse(req.params.id);

        if (!idResult.success) {
            return res.status(400).json({
                message: "ID-ul categoriei este invalid"
            });
        }

        const category = await prisma.category.findUnique({
            where: {
                id: idResult.data
            }
        });

        if (!category) {
            return res.status(404).json({
                message: "Categoria nu a fost gasita"
            });
        }

        const products = await prisma.product.findFirst({
            where: {
                categoryId: idResult.data
            }
        });

        if (products) {
            return res.status(409).json({
                message: "Categoria nu poate fi stearsa deoarece are produse asociate"
            });
        }

        await prisma.category.delete({
            where: {
                id: idResult.data
            }
        });

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};