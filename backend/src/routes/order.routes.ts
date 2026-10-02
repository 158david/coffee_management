import { Router } from "express";
import { 
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    createOrderItem,
    getOrderItems,
    updateOrderItem,
    deleteOrderItem
 } from "../controllers/order.controller.js";

const router = Router();

router.get("/", getOrders);
router.get("/:id", getOrderById);
router.put("/:id", updateOrder)
router.post("/", createOrder);
router.post("/:id/items", createOrderItem);
router.get("/:id/items", getOrderItems);
router.put("/:id/items/:itemId", updateOrderItem);
router.delete("/:id/items/:itemId", deleteOrderItem);

export default router;