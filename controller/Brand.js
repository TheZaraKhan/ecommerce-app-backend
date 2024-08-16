const Brand = require("../model/Brand");

exports.fetchBrands = async (req, res) => {
  try {
    const categories = await Brand.find({}).exec();
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.createBrand = async (req, res) => {
  const brand = new Brand(req.body);
  try {
    const result = await brand.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};
