import mongoose from "mongoose";
import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express();

router.get("/", async (req, res) => {
  try {
    const userList = await User.find().select("-passwordHash");
    res.send(userList);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-passwordHash");
    res.send(user);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.get("/get/count", async (req, res) => {
  try {
    const userCount = await User.countDocuments((count) => count);
    if (!userCount) return res.status(500).json({ success: false });
    res.status(200).send({
      userCount,
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      street: req.body.street,
      apartment: req.body.apartment,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country,
    });
    user = await user.save();

    if (!user) return res.status(400).send("the user cannot be created!");

    res.send(user);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("user not found");
    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
      const token = jwt.sign(
        {
          userId: user.id,
          isAdmin: user.isAdmin,
        },
        process.env.secret,
        { expiresIn: "1w" }
      );
      res.status(200).send({ user: user.email, token: token });
    } else {
      res.status(400).send("Password is wrong");
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

router.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (user) {
        return res.status(200).json({
          success: true,
          message: "user deleted",
        });
      } else {
        return res.status(404).json({
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

export default router;
