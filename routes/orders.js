const express = require("express");
const router = express.Router();
const Order = require("../models/order");

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", getOrder, (req, res) => {
  res.json(res.order);
});

router.post("/", async (req, res) => {
  const order = new Order({
    productId: req.body.productId,
    quantity: req.body.quantity,
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// middleware function
async function getOrder(req, res, next) {
  let order;

  try {
    order = await Order.findById(req.params.id);

    if (order == null) {
      return res.status(404).json({ message: "Cannot find order" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.order = order;

  next();
}

module.exports = router;
