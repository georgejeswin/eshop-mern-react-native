import express from "express";
import mongoose from "mongoose";
import Category from "../models/categoryModel.js";
import ProductModel from "../models/productModel.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await ProductModel.find();
  res.json(products);
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.findById(id);
    res.status(200).send(product);
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send("Invalid category");
    else {
      let product = new ProductModel({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        images: req.body.images,
        brand: req.body.images,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
        dateCreated: req.body.dateCreated,
      });

      product = await product.save();
      if (!product) {
        return res.status(500).send("The product cannot be saved");
      }
      res.status(201).send(product);
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});
export default router;
