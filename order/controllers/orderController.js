const Order = require("../models/Order");
const orderCreateSchema = require("../validations/orderCreate.validation");

const orderController = {
  // create order
  createOrder: async (req, res) => {
    try {
      const { orderItems, shippingAddress, totalPrice } = req.body;
      const buyer = req.userId;

      // validation
      orderCreateSchema.parse(req.body);

      const newOrder = new Order({
        buyer,
        orderItems,
        shippingAddress,
        status: "Pending",
        totalPrice,
      });

      const savedOrder = await newOrder.save();

      //TODO: update product stock - send event to product service

      res.status(201).json({
        success: true,
        order: savedOrder,
        message: "Order created successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get all orders
  getOrders: async (req, res) => {
    try {
      const orders = await Order.find()
        .populate("buyer", "name email")
        .populate("orderItems.product", "name price");

      res.status(200).json({ success: true, orders });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get order by id
  getOrderById: async (req, res) => {
    try {
      const orderId = req.params.id;
      const order = await Order.findById(orderId)
        .populate("buyer", "name email")
        .populate("orderItems.product", "name price");

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      res.status(200).json({ success: true, order });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // update order
  updateOrder: async (req, res) => {
    try {
      const orderId = req.params.id;
      const order = await Order.findById(orderId);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, {
        new: true,
      })
        .populate("buyer", "name email")
        .populate("orderItems.product", "name price");

      res.status(200).json({
        success: true,
        order: updatedOrder,
        message: "Order updated successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // delete order
  deleteOrder: async (req, res) => {
    try {
      const orderId = req.params.id;

      const order = await Order.findById(orderId);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      const deletedOrder = await Order.findByIdAndDelete(orderId)
        .populate("buyer", "name email")
        .populate("orderItems.product", "name price");

      res.status(200).json({
        success: true,
        order: deletedOrder,
        message: "Order deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get orders count using aggregation
  getOrdersCount: async (req, res) => {
    try {
      const ordersCount = await Order.aggregate([
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
          },
        },
      ]);

      res
        .status(200)
        .json({ success: true, count: ordersCount[0]?.count || 0 });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },
};

module.exports = orderController;
