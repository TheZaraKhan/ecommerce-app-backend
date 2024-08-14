const User = require("../model/User");

exports.fetchUserById = async (req, res) => {
  try {
    // dont return password  in the response
    const users = await User.findById(req.params.id, { password: 0 }).exec();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

// exports.fetchloggedInUserOrders = async (req, res) => {
//   try {
//     const users = await User.find({}).exec();
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// };
