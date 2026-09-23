import { Router } from "express";
import {
    getRecipeIngredients,
    createRecipeIngredient,
    updateRecipeIngredient,
    deleteRecipeIngredient
} from "../controllers/recipeIngredient.controller.js";

const router = Router();

router.get("/", getRecipeIngredients);
router.post("/", createRecipeIngredient);
router.put("/:id", updateRecipeIngredient);
router.delete("/:id", deleteRecipeIngredient)

export default router;