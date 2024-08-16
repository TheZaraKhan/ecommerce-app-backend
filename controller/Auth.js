const User = require("../model/User");

// exports.createUser = async (req, res) => {
//   const user = new User(req.body);
//   try {
//     const result = await user.save();
//     res.status(201).json(result);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// };

exports.createUser = async (req, res) => {
  const { name, email, password, role = "user", addresses = [] } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required" });
  }

  try {
    // Create new user
    const user = new User({ name, email, password, role, addresses });
    const result = await user.save();
    res.status(201).json(result);
  } catch (err) {
    // Enhanced error logging
    console.error("Error creating user:", err);
    res.status(400).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
      // Email not found
      return res.status(401).json({ message: "Invalid email" });
    }

    if (user.password !== req.body.password) {
      // Password does not match
      return res.status(401).json({ message: "Invalid password" });
    }

    // Successful login
    res.status(200).json({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });
  } catch (err) {
    // Generic error handling
    res.status(400).json({ message: "An error occurred", error: err.message });
  }
};
