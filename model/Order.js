const mongoose = require("mongoose");
const Product = require("./Product");

const attach = mongoose.Schema.Types.ObjectId;
const Mixed = mongoose.Schema.Types.Mixed;
const orderSchema = new mongoose.Schema({
  items: [{ type: [Mixed], required: true }],
  user: {
    type: attach,
    ref: "User",
    required: true,
  },
  address: {
    type: [Mixed],
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;

// below is for virtual key  in mongo it already created id using "_id"
// whereas in our application we are calling id as "id"
const virtual = orderSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

orderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
