const Order = require("../model/Order");
// we need this  cart count for pagination
exports.fetchOrdersByUser = async (req, res) => {
  const { user } = req.query; // Use req.query instead of req.params
  try {
    const orders = await Order.find({ user: user });
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.createOrder = async (req, res) => {
  const order = new Order(req.body);
  try {
    const doc = await order.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).exec();
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id).exec();
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json(err);
  }
};
