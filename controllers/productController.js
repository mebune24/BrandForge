const Product = require("../models/Product");

// @route GET /api/products
const getProducts = async (req, res) => {
  const products = await Product.find({ isActive: true });
  res.json(products);
};

// @route GET /api/products/:id
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

// @route POST /api/products  (admin/staff only)
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @route PUT /api/products/:id (admin/staff only)
const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

// @route DELETE /api/products/:id (admin/staff only)
const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json({ message: "Product deactivated" });
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
