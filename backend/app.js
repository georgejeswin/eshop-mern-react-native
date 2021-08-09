import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import productsRouter from "./routes/products.js";
import categoryRouter from "./routes/category.js";

dotenv.config({ path: ".env" });

const api = process.env.API_URL;

const app = express();

//middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(`${api}/products`, productsRouter);
app.use(`${api}/category`, categoryRouter);

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "eshopDB",
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(5000, () => {
  console.log("server running on port 3000");
});