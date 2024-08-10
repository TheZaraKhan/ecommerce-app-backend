const { fetchCategories, createCategory } = require("../controller/Category");

const express = require("express");

const router = express.Router();
// /products is already in the base url

router.get("/", fetchCategories).post("/", createCategory);

exports.router = router;
