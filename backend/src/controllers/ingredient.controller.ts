import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma.js";
import {
    createIngredientSchema,
    updateIngredientSchema,
    IngredientSchema
} from "../schemas/ingredient.schemas.js";

export const getIngredients = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const ingredients = await prisma.ingredient.findMany();

        res.json(ingredients);
    } catch (error) {
        next(error);
    }
};

export const createIngredient = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = createIngredientSchema.safeParse(req.body);

        if(!result.success) {
            return res.status(400).json({
                message: "Date invalide",
                errors: result.error.issues
            });
        }

        const ingredient = await prisma.ingredient.create({
            data: result.data
        });

        res.status(201).json(ingredient);
    }catch (error) {
        next(error);
    }
};

export const getIngredientById = async (
    req: Request,
    res: Response,
    next: NextFunction 
) => {
    try {
        const result = IngredientSchema.safeParse(req.params.id);
        
        if (!result.success) {
            return res.status(400).json({
                message: "ID-ul ingredientului este invalid"
            });
        }

        const ingredient = await prisma.ingredient.findUnique({
            where: {
                id: result.data
            }
        });

        if (!ingredient) {
            return res.status(404).json({
                message: "Ingredientul nu a fost gasit"
            });
        }

        res.json(ingredient);
    } catch (error) {
        next(error);
    }
};

export const updateIngredient = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
     try {
    const idResult = IngredientSchema.safeParse(req.params.id);

    if (!idResult.success) {
        return res.status(400).json ({
            message: "ID-ul ingredientului este invalid"
        });
    }

    const dataResult = updateIngredientSchema.safeParse(req.body);

    if (!dataResult.success) {
        return res.status(400).json({
            message: "Datele ingredientului sunt invalide",
            error: dataResult.error.issues
        });
    }

    const ingredient = await prisma.ingredient.findUnique({
        where: {
            id: idResult.data
        }
    });

    if (!ingredient) {
        return res.status(404).json({
            message: "Ingredientul nu a fost gasit"
        });
    }

    const updatedIngredient = await prisma.ingredient.update({
        where: {
            id: idResult.data
        },
        data: dataResult.data
    });

    res.json(updatedIngredient);
}catch (error) {
    next(error);
}
};

export const deleteIngredient = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const idResult = IngredientSchema.safeParse(req.params.id);

        if (!idResult.success) {
            return res.status(400).json({
                message: "ID-ul ingredientului este invalid"
            });
        }

        const ingredient = await prisma.ingredient.findUnique({
            where: {
                id: idResult.data
            }
        });

        if (!ingredient) {
            return res.status(404).json({
                message: "Ingredientul nu a fost gasit"
            });
        }

        const updatedIngredient = await prisma.ingredient.update ({
            where: {
                id: idResult.data
            },
            data: {
                active: false
            }
        });

        res.json(updatedIngredient);
    } catch (error) {
        next(error);
    }
};