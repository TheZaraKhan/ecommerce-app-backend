const Product = require("../model/Product");

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    const result = await product.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchAllProducts = async (req, res) => {
  let query = Product.find({ delete: { $ne: true } });

  // Adjust totalProducts query to exclude deleted items
  let totalProducts = Product.countDocuments({ delete: { $ne: true } });

  //   const totalObjects = await Product.countDocuments(query).exec();
  //   console.log({ totalObjects });

  if (req.query.category) {
    query = query.find({
      category: req.query.category,
    });
    totalProducts = totalProducts.find({
      category: req.query.category,
    });
  }
  if (req.query.brand) {
    query = query.find({
      brand: req.query.brand,
    });
    totalProducts = totalProducts.find({
      brand: req.query.brand,
    });
  }
  if (req.query._sort && req.query._order) {
    query = query.sort({
      [req.query._sort]: req.query._order,
    });
  }

  // we need this  product count for pagination

  const totalObjects = await totalProducts.countDocuments().exec();
  res.setHeader("X-Total-Count", totalObjects);
  console.log({ totalObjects });

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const result = await query.exec();
    res.status(200).json(result);
    console.log(result.length, result);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).exec();
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).exec();
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};
