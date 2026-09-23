import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma.js";
import {
    createRecipeIngredientSchema,
    updateRecipeIngredientSchema,
    recipeIngredientIdSchema
} from "../schemas/recipeIngredient.schemas.js";

export const getRecipeIngredients = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const recipeIngredients = await prisma.recipeIngredient.findMany({
            include: {
                product: true,
                ingredient: true
            }
        });

        res.json(recipeIngredients);
    } catch (error) {
        next(error);
    }
};

export const createRecipeIngredient = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = createRecipeIngredientSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Date invalide",
                errors: result.error.issues
            });
        }

        const product = await prisma.product.findUnique({
            where: {
                id: result.data.productId
            }
        });

        if (!product) {
            return res.status(400).json({
                message: "Produsul specificat nu exista"
            });
        }

        const ingredient = await prisma.ingredient.findUnique({
            where: {
                id: result.data.ingredientId
            }
        });

        if (!ingredient) {
            return res.status(400).json({
                message: "Ingredientul specificat nu exista"
            });
        }

        const recipeIngredient = await prisma.recipeIngredient.create({
            data: result.data
        });

        res.status(201).json(recipeIngredient);
    } catch (error) {
        next(error);
    }
};

export const updateRecipeIngredient = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const idResult = recipeIngredientIdSchema.safeParse(req.params.id);

        if (!idResult.success) {
            return res.status(400).json({
                message: "ID-ul retetei este invalid"
            });
        }

        const dataResult = updateRecipeIngredientSchema.safeParse(req.body);

        if (!dataResult.success) {
            return res.status(400).json({
                message: "Datele retetei sunt invalide",
                errors: dataResult.error.issues
            });
        }

        const recipeIngredient = await prisma.recipeIngredient.findUnique({
            where: {
                id: idResult.data
            }
        });

        if (!recipeIngredient) {
            return res.status(400).json({
                message: "Reteta nu a fost gasita"
            });
        }

        const updatedRecipeIngredient = await prisma.recipeIngredient.update({
            where: {
                id: idResult.data
            },
            data: dataResult.data
        });

        res.json(updatedRecipeIngredient);
    } catch (error) {
        next(error);
    }
};

export const deleteRecipeIngredient = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const idResult = recipeIngredientIdSchema.safeParse(req.params.id);

        if (!idResult.success) {
            return res.status(400).json({
                message: "ID-ul retetei este invalid"
            });
        }

        const recipeIngredient = await prisma.recipeIngredient.findUnique({
            where: {
                id: idResult.data
            }
        });
        
        if (!recipeIngredient) {
            return res.status(404).json({
                message: "Reteta nu a fost gasita"
            });
        }

        await prisma.recipeIngredient.delete({
            where: {
                id: idResult.data
            }
        });

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};