const {
  addToCart,
  fetchCart,
  updateCart,
  deleteItemFromCart,
} = require("../controller/Cart");
const { Cart } = require("../model/Cart");

const express = require("express");
const router = express.Router();
// /products is already in the base url

router
  .post("/", addToCart)
  .get("/", fetchCart)
  .patch("/:id", updateCart)
  .delete("/:id", deleteItemFromCart);

exports.router = router;
