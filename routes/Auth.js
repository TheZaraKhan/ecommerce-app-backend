const { loginUser, createUser } = require("../controller/Auth");

const express = require("express");

const router = express.Router();

router.post("/signup", createUser).post("/login", loginUser);

exports.router = router;
