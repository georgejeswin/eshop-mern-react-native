import express from "express";
import Category from "../models/categoryModel.js";
import CategoryModel from "../models/categoryModel.js";

const router = express.Router();

router.get(`/`, async (req, res) => {
  const categoryList = await CategoryModel.find();
  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(categoryList);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(500).json({
      message: "category with specific id not found",
    });
  }
  res.status(200).send(category);
});

router.post(`/`, async (req, res) => {
  try {
    let category = new CategoryModel({
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    });
    category = await category.save();
    if (!category) {
      return res.status(404).send("Category cannot be created");
    }
    res.status(200).send(category);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    { new: true }
  );

  if (!category) {
    return res.status(500).json({ message: "category cannot be created" });
  }

  res.status(201).send(category);
});

router.delete(`/:id`, (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category) {
        return res.status(200).json({
          success: true,
          message: "category deleted",
        });
      } else {
        res.status(404).json({ success: false, message: "category not found" });
      }
    })
    .catch((err) => {
      res.status(400).json({ success: false, error: err });
    });
});

export default router;
