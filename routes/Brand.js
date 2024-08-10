const { fetchBrands, createBrand } = require("../controller/Brand");

const express = require("express");

const router = express.Router();
// /products is already in the base url

router.get("/", fetchBrands).post("/", createBrand);

exports.router = router;
