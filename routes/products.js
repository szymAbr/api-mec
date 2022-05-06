const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// getting all
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// getting one
router.get("/:id", getProduct, (req, res) => {
  res.json(res.product);
});

// // N/A
// // creating one
// router.post("/", async (req, res) => {
//   const product = new Product({
//     productId: req.body.productId,
//     name: req.body.name,
//     price: req.body.price,
//     stock: req.body.stock,
//   });

//   try {
//     const newProduct = await product.save();
//     res.status(201).json(newProduct);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // updating one
// router.patch("/:id", getProduct, async (req, res) => {
//   if (req.body.productId != null) {
//     res.product.productId = req.body.productId;
//   }

//   if (req.body.name != null) {
//     res.product.name = req.body.name;
//   }

//   if (req.body.price != null) {
//     res.product.price = req.body.price;
//   }

//   if (req.body.stock != null) {
//     res.product.stock = req.body.stock;
//   }

//   try {
//     const updatedProduct = await res.product.save();
//     res.json(updatedProduct);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // deleting one
// router.delete("/:id", getProduct, async (req, res) => {
//   try {
//     await res.product.remove();
//     res.json({ message: "Deleted product" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// middleware function
async function getProduct(req, res, next) {
  let product;

  try {
    product = await Product.findById(req.params.id);

    if (product == null) {
      return res.status(404).json({ message: "Cannot find product" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.product = product;

  next();
}

module.exports = router;
