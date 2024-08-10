const {
  createProduct,
  fetchAllProducts,
  fetchProductById,
  updateProduct,
} = require("../controller/Product");
const { Product } = require("../model/Product");

const express = require("express");
const router = express.Router();
// /products is already in the base url

router
  .post("/", createProduct)
  .get("/", fetchAllProducts)
  .get("/:id", fetchProductById)
  .patch("/:id", updateProduct);

exports.router = router;
