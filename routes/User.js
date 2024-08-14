const { fetchUserById, updateUser } = require("../controller/User");

const express = require("express");

const router = express.Router();

router.get("/:id", fetchUserById).patch("/:id", updateUser);

exports.router = router;

// module.exports = router;
