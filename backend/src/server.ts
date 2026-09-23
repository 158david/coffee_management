import express from "express";
import productRoutes from "./routes/product.routes.js"; 
import { errorMiddleware } from "./middlewares/error.middleware.js";
import ingredientRoutes from "./routes/ingredient.routes.js";
import categoryRoutes from "./routes/category.routes.js";

const app = express();

app.use(express.json());

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Coffee Management API is running!");
});

app.use("/api/products", productRoutes);
app.use("/api/ingredients", ingredientRoutes);
app.use("/api/categories", categoryRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use(errorMiddleware);

