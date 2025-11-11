import Order from "../models/order.js";
import OrderItem from "../models/order-item.js";
import Product from "../models/product.js";

// Tạo đơn hàng cùng OrderItems
export const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress1, city, zip, country, phone, user } = req.body;

    // 1. Tạo các OrderItem
    const orderItemIds = await Promise.all(
      orderItems.map(async (item) => {
        const newItem = new OrderItem({
          product: item.product,
          quantity: item.quantity,
        });
        const savedItem = await newItem.save();
        return savedItem._id;
      })
    );

    // 2. Tính tổng tiền
    const totalPrices = await Promise.all(
      orderItemIds.map(async (id) => {
        const item = await OrderItem.findById(id).populate("product", "price");
        return item.product.price * item.quantity;
      })
    );
    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

    // 3. Tạo Order
    const order = new Order({
      orderItems: orderItemIds,
      shippingAddress1,
      city,
      zip,
      country,
      phone,
      user,
      totalPrice,
    });

    const savedOrder = await order.save();

    // 4. Populate để trả về chi tiết
    const populatedOrder = await Order.findById(savedOrder._id)
      .populate({
        path: "orderItems",
        populate: { path: "product", select: "name price" },
      })
      .populate("user", "name email");

    res.status(201).json(populatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy tất cả đơn hàng kèm OrderItems
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "orderItems",
        populate: { path: "product", select: "name price" },
      })
      .populate("user", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy đơn hàng theo ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate({
        path: "orderItems",
        populate: { path: "product", select: "name price" },
      })
      .populate("user", "name email");

    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật trạng thái đơn hàng
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updatedOrder) return res.status(404).json({ message: "Order not found" });
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xoá đơn hàng và các OrderItems liên quan
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Xoá các OrderItem
    await Promise.all(order.orderItems.map(async (itemId) => {
      await OrderItem.findByIdAndDelete(itemId);
    }));

    // Xoá Order
    await order.deleteOne();

    res.json({ message: "Order and related items deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
