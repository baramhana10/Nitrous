import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// Get Payment Method Statistics (Must come before generic GET /orders)
router.get("/stats/payments", async (req, res) => {
  try {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: "$paymentMethod",
          count: { $sum: 1 },
        },
      },
    ]);

    const result = {
      card: 0,
      cash: 0,
      total: 0,
    };

    stats.forEach((stat) => {
      if (stat._id === "card") result.card = stat.count;
      if (stat._id === "cash") result.cash = stat.count;
    });

    result.total = (result.card || 0) + (result.cash || 0);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching payment stats:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Update Order Status (Using PUT for better compatibility)
router.put("/status/:id", async (req, res) => {
  try {
    const { status } = req.body;
    console.log(`[STRICT-UPDATE] Order: ${req.params.id} -> ${status}`);

    // Direct update to prevent validation issues with other fields
    const result = await Order.updateOne(
      { _id: req.params.id },
      { $set: { status: status } },
    );

    if (result.matchedCount > 0) {
      console.log("[STRICT-UPDATE] Success");
      res.status(200).json({ message: "Status updated", status });
    } else {
      console.log("[STRICT-UPDATE] Order not found");
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error("[STRICT-UPDATE] Critical Error:", error);
    res.status(500).json({ message: error.message });
  }
});

// Create new order
router.post("/", async (req, res) => {
  try {
    const { orderItems, shippingDetails, paymentMethod, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    } else {
      const order = new Order({
        items: orderItems,
        user: req.user ? req.user._id : null, // Handle auth later if needed
        shippingDetails,
        paymentMethod,
        totalAmount: totalPrice,
        isPaid: paymentMethod === "card" ? true : false, // Simulating instant payment for card
        paidAt: paymentMethod === "card" ? Date.now() : null,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get All Orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
