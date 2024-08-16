const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const port = 8080;

const { createProduct, fetchAllProducts } = require("./controller/Product");
const productRouter = require("./routes/Product");
const categoryRouter = require("./routes/Category");
const brandRouter = require("./routes/Brand");
const userRouter = require("./routes/User");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const ordersRouter = require("./routes/Order");

// middleware
server.use(cors());
server.use(express.json()); // for parsing application/json
server.use("/products", productRouter.router);
server.use("/categories", categoryRouter.router);
server.use("/brands", brandRouter.router);
server.use("/users", userRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart", cartRouter.router);
server.use("/orders", ordersRouter.router);

async function main() {
  await mongoose.connect("mongodb://localhost:27017/ecommerce-app");
  console.log("connected to MongoDB");
}
main().catch((err) => console.log(err));

server.get("/", (req, res) => {
  res.send("success");
});

server.post("/products", createProduct);

// server.get("/products", fetchAllProducts);
// server.get("brands", fetchBrands);

server.listen(port, () => {
  console.log("server is running on port 8080");
});
