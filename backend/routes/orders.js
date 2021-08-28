import express from "express";
import OrderItem from "../models/orderItemModel.js";
import Order from "../models/orderModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const orderList = await Order.find()
      .populate("user", "name")
      .sort({ dateOrdered: -1 });
    if (!orderList) return res.status(404).json({ success: false });
    res.status(200).send(orderList);
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name")
      .populate({
        path: "orderItems",
        populate: { path: "product", populate: "category" },
      });
    if (!order) return res.status(404).json({ success: false });
    res.status(200).send(order);
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

    const totalPrices = await Promise.all(
      orderItemsIdsResolved.map(async (orderItemId) => {
        const orderItem = await OrderItem.findById(orderItemId).populate(
          "product",
          "price"
        );
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice;
      })
    );
    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);
    console.log(totalPrice);

    let order = new Order({
      orderItems: orderItemsIdsResolved,
      shippingAddress1: req.body.shippingAddress1,
      shippingAddress2: req.body.shippingAddress2,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      status: req.body.status,
      totalPrice: totalPrice,
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

router.put("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true }
    );
    if (!order) res.status(400).send("Order cannot be updated");
    return res.status(200).send(order);
  } catch (error) {
    res.status(405).json({ error: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    Order.findByIdAndRemove(req.params.id).then(async (order) => {
      if (order) {
        await order.orderItems.map(async (orderItem) => {
          await orderItem.findByIdAndRemove(orderItem);
        });
        return res
          .status(200)
          .json({ success: true, message: "order is deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "order cannot be deleted" });
      }
    });
  } catch (error) {
    res.status(405).json({ error: error });
  }
});

router.get("/get/totalsales", async (req, res) => {
  try {
    const totalSales = await Order.aggregate([
      { $group: { _id: null, totalSales: { $sum: "$totalPrice" } } },
    ]);
    if (!totalSales)
      res.status(400).send("the order sales cannot be generated");
    res.status(200).send({ totalsales: totalSales.pop().totalSales });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.get("/get/count", async (req, res) => {
  try {
    const OrderCount = await Order.countDocuments((count) => count);
    if (!OrderCount) {
      res.status(404).send("no orders");
    }
    res.status(200).json({
      OrderCount,
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
});

router.get("/get/userorders/:userid", async (req, res) => {
  try {
    const userOrderList = await Order.find({ user: req.params.userid })
      .populate({
        path: "orderItems",
        populate: { path: "product", populate: "category" },
      })
      .sort({ dateOrdered: -1 });
    if (!userOrderList) return res.status(404).json({ success: false });
    res.status(200).send(userOrderList);
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
});

export default router;
