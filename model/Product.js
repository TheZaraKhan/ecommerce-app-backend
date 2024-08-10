const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "price can't be negative"],
    max: [100000, "price can't be higher than 100000"],
    default: 0,
  },
  discount: {
    type: Number,
    required: true,
    min: [1, "discount can't be negative"],
    max: [99, "discount can't be higher than 100"],
    default: 0,
  },
  rating: {
    type: Number,
    required: true,
    min: [0, "rating can't be negative"],
    max: [5, "rating can't be higher than 5"],
    default: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: [0, "stock can't be negative"],
    default: 0,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  images: {
    type: String,
    required: true,
  },
  delete: {
    type: Boolean,
    default: false,
  },
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;

// below is for virtual key  in mongo it already created id using "_id"
// whereas in our application we are calling id as "id"
const virtual = productSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
