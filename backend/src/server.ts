import express from "express";
import productRoutes from "./routes/product.routes.js"; 
import { errorMiddleware } from "./middlewares/error.middleware.js";
import ingredientRoutes from "./routes/ingredient.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import recipeIngredientRoutes from "./routes/recipeIngredient.routes.js";

const app = express();

app.use(express.json());

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Coffee Management API is running!");
});

app.use("/api/products", productRoutes);
app.use("/api/ingredients", ingredientRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/recipe-ingredients", recipeIngredientRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use(errorMiddleware);

