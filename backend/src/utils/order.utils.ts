import { prisma } from "../config/prisma.js";

export const recalculateOrderTotal = async (orderId: number) => {
    const items = await prisma.orderItem.findMany({
        where: {
            orderId
        }
    });

    const total = items.reduce(
        (sum, item) => sum + Number(item.unitPrice) * item.quantity,
        0
    );

    await prisma.order.update({
        where: {
            id: orderId
        },
        data: {
            total
        }
    });
};