import express from "express";
import dotenv from "dotenv";
import productRoutes from "./modules/product/product.routes.js";
import helmet from "helmet";
import { xss } from "express-xss-sanitizer";
import logger from "./middleware/logger.middleware.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(logger);

app.get("/", (req, res) => {
  res.send("Thrift Store API is running!");
});

app.use("/api/products", productRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
