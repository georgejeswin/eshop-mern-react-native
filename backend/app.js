import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import productsRouter from "./routes/products.js";
import categoryRouter from "./routes/category.js";
import userRouter from "./routes/users.js";
import authJwt from "./helpers/jwt.js";
import errorHandler from "./helpers/errorHandler.js";
import orderRouter from "./routes/orders.js";

dotenv.config({ path: ".env" });

const api = process.env.API_URL;

const app = express();

//middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use(errorHandler);

app.use(`${api}/products`, productsRouter);
app.use(`${api}/category`, categoryRouter);
app.use(`${api}/users`, userRouter);
app.use(`${api}/orders`, orderRouter);

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
