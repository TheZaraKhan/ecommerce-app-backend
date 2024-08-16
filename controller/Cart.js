const Cart = require("../model/Cart");

exports.addToCart = async (req, res) => {
  const cart = new Cart(req.body);
  try {
    const doc = await cart.save();
    const result = await doc.populate("product");
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

// we need this  cart count for pagination
exports.fetchCart = async (req, res) => {
  const user = req.query.user; // Use req.query instead of req.params
  try {
    const cart = await Cart.find({ user: user })
      .populate("user")
      .populate("product")
      .exec();
    res.status(200).json(cart);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).exec();
    res.status(200).json(cart);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteItemFromCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id).exec();
    res.status(200).json(cart);
  } catch (err) {
    res.status(400).json(err);
  }
};

// exports.resetCart = async (req, res) => {
//   try {
//     const cart = await Cart.findByIdAndDelete(req.params.id).exec();
//     res.status(200).json(cart);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// }
