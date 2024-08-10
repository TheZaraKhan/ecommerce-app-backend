const mongoose = require("mongoose");
const brandSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: String,
    required: true,
    unique: true,
  },
  checked: {
    type: Boolean,
    default: false,
  },
});

const Brand = mongoose.model("Brand", brandSchema);
module.exports = Brand;

// below is for virtual key  in mongo it already created id using "_id"
// whereas in our application we are calling id as "id"
const virtual = brandSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

brandSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
