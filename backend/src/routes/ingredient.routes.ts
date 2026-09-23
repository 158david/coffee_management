import { Router } from "express";
import { getIngredients,
    getIngredientById,
    createIngredient,
    updateIngredient,
    deleteIngredient
 } from "../controllers/ingredient.controller.js";

const router = Router();

router.get("/", getIngredients);

router.get("/:id", getIngredientById);

router.post("/", createIngredient);

router.put("/:id", updateIngredient);

router.delete("/:id", deleteIngredient);
export default router;