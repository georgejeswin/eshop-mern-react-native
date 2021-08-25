import express from "express";
import OrderItem from "../models/orderItemModel.js";
import Order from "../models/orderModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const orderList = await Order.find();
    if (!orderList) return res.status(404).json({ success: false });
    res.status(200).send(orderList);
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const orderItemIds = Promise.all(
      req.body.orderItems.map(async (orderItem) => {
        let newOrderItem = new OrderItem({
          quantity: orderItem.quantity,
          product: orderItem.product,
        });
        newOrderItem = await newOrderItem.save();
        return newOrderItem._id;
      })
    );
    const orderItemsIdsResolved = await orderItemIds;

    let order = new Order({
      orderItems: orderItemsIdsResolved,
      shippingAddress1: req.body.shippingAddress1,
      shippingAddress2: req.body.shippingAddress2,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      status: req.body.status,
      totalPrice: req.body.totalPrice,
      user: req.body.user,
    });
    order = await order.save();
    if (!order)
      return res.status(500).json({ error: "order cannot be placed" });

    res.status(201).send(order);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

export default router;
