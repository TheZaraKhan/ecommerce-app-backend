const {
  fetchOrdersByUser,
  updateOrder,
  createOrder,
  deleteOrder,
} = require("../controller/Order");
const { Order } = require("../model/Order");

const express = require("express");
const router = express.Router();
// /products is already in the base url

router
  .post("/", createOrder)
  .get("/", fetchOrdersByUser)
  .patch("/:id", updateOrder)
  .delete("/:id", deleteOrder);

exports.router = router;
