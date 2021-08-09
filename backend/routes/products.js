import express from "express";
import Category from "../models/categoryModel.js";
import ProductModel from "../models/productModel.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let filter = {};
    if (req.query.categories) {
      filter = { category: req.query.categories.split(",") };
    }
    const productList = await ProductModel.find(filter).populate("category");
    if (!productList) {
      res.status(500).json({ success: false });
    }
    res.json(productList);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.findById(id).populate("category");
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

router.put("/:id", async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      {
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
      },
      { new: true }
    );
    if (!product) {
      return res.status(500).send("Cannot update");
    }
    res.status(201).send(product);
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
});

router.delete("/:id", (req, res) => {
  ProductModel.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (product) {
        return res.status(200).json({
          success: true,
          message: "Product deleted",
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "delete failed",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

router.get("/get/count", async (req, res) => {
  try {
    const productCount = await ProductModel.countDocuments((count) => count);
    if (!productCount) {
      res.status(404).send("no products");
    }
    res.status(200).json({
      productCount,
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
});

router.get("/get/featured/:count", async (req, res) => {
  try {
    const count = req.params.count ? req.params.count : 0;
    const featured = await ProductModel.find({ isFeatured: true }).limit(
      +count
    );
    if (!featured) {
      res.status(404).send("no featured products");
    }
    res.status(200).json({
      featured,
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
});

export default router;
