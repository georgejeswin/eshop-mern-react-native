import express from "express";
import Category from "../models/categoryModel.js";
import ProductModel from "../models/productModel.js";
import multer from "multer";
import mongoose from "mongoose";

const router = express.Router();

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadErr = new Error("Invalid image type");
    if (isValid) uploadErr = null;
    cb(uploadErr, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extenstion = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extenstion}`);
  },
});

const uploadOptions = multer({ storage: storage });

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

router.post("/", uploadOptions.single("image"), async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send("Invalid category");
    const file = req.file;
    if (!file) return res.status(400).send("No image in the request ");
    const fileName = req.file.filename;
    const basepath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    let product = new ProductModel({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: `${basepath}${fileName}`,
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

router.put(
  "/gallery-images/:id",
  uploadOptions.array("images", 10),
  async (req, res) => {
    try {
      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send("Invalid product id");
      }
      const category = await Category.findById(req.body.category);
      if (!category) return res.status(400).send("Invalid category");
      let imagesPaths = [];
      const basepath = `${req.protocol}://${req.get("host")}/public/uploads/`;
      const files = req.files;
      if (files) {
        files.map((file) => {
          imagesPaths.push(`${basepath}${file.filename}`);
        });
      }
      const product = await ProductModel.findByIdAndUpdate(
        req.params.id,
        {
          images: imagesPaths,
        },
        { new: true }
      );
      if (!product) {
        return res.status(500).send("Cannot update");
      }
      res.status(201).send(product);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
);

export default router;
