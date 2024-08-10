const express = require("express");
const server = express();
const mongoose = require("mongoose");

const { createProduct, fetchAllProducts } = require("./controller/Product");
const productRouter = require("./routes/Product");
const categoryRouter = require("./routes/Category");
const BrandRouter = require("./routes/Brand");
const { fetchBrands } = require("./controller/Brand");

const port = 8080;

// middleware
server.use(express.json()); // for parsing application/json

server.use("/products", productRouter.router);
server.use("/categories", categoryRouter.router);
server.use("/brands", BrandRouter.router);

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
