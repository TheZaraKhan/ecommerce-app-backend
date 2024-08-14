const mongoose = require("mongoose");

const Mixed = mongoose.Schema.Types.Mixed;
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    default: false,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  addresses: {
    type: [Mixed],
    default: [],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;

// below is for virtual key  in mongo it already created id using "_id"
// whereas in our application we are calling id as "id"
const virtual = userSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
