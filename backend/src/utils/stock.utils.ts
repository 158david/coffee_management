import { prisma } from "../config/prisma.js";

export const consumeOrderStock = async (orderId: number) => {
    const orderItems = await prisma.orderItem.findMany({
        where: {
            orderId
        },
        include: {
            product: {
                include: {
                    recipeIngredients: {
                        include: {
                            ingredient: true
                        }
                    }
                }
            }
        }
    });

for (const orderItem of orderItems) {
    for (const recipeIngredient of orderItem.product.recipeIngredients) {
        const consumedQuantity = orderItem.quantity * Number(recipeIngredient.quantity);

       await prisma.ingredient.update({
        where: {
            id: recipeIngredient.ingredient.id
        },
        data: {
            quantity: {
                decrement: consumedQuantity
            }
        }
       });

       console.log(
        `${recipeIngredient.ingredient.name}: -${consumedQuantity} ${recipeIngredient.ingredient.unit}`
       );  
    }
  }
};