
import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
} from "../controllers/order.controller.js";

const router = express.Router();

// Tạo đơn hàng mới kèm OrderItems
router.post("/", createOrder);

// Lấy tất cả đơn hàng
router.get("/", getAllOrders);

// Lấy đơn hàng theo ID
router.get("/:id", getOrderById);

// Cập nhật trạng thái đơn hàng
router.put("/:id", updateOrderStatus);

// Xoá đơn hàng và OrderItems liên quan
router.delete("/:id", deleteOrder);

export default router;
