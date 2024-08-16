const mongoose = require("mongoose");
const Product = require("./Product");

const attach = mongoose.Schema.Types.ObjectId;
const cartSchema = new mongoose.Schema({
  product: {
    type: attach,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  user: {
    type: attach,
    ref: "User",
    required: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;

// below is for virtual key  in mongo it already created id using "_id"
// whereas in our application we are calling id as "id"
const virtual = cartSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

cartSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
