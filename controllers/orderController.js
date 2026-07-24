const Order = require("../models/Order");
const Product = require("../models/Product");

// @route POST /api/orders
// Body: { items: [{ productId, quantity, color, size, printingOption, designUrl }], deliveryAddress }
const createOrder = async (req, res) => {
  try {
    const { items, deliveryAddress } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order must include at least one item" });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) return res.status(404).json({ message: `Product ${item.productId} not found` });

      const unitPrice = product.basePrice; // simple pricing for now — extend with printing add-on costs later
      totalAmount += unitPrice * item.quantity;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
        printingOption: item.printingOption,
        designUrl: item.designUrl,
        unitPrice,
      });
    }

    const order = await Order.create({
      customer: req.user._id,
      items: orderItems,
      totalAmount,
      deliveryAddress,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route GET /api/orders/mine
const getMyOrders = async (req, res) => {
  const orders = await Order.find({ customer: req.user._id }).populate("items.product", "name imageUrl");
  res.json(orders);
};

// @route GET /api/orders  (admin/staff only)
const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("customer", "name email").populate("items.product", "name");
  res.json(orders);
};

// @route GET /api/orders/:orderCode  (order tracking)
const trackOrder = async (req, res) => {
  const order = await Order.findOne({ orderCode: req.params.orderCode }).populate("items.product", "name imageUrl");
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
};

// @route PUT /api/orders/:id/status  (admin/staff only) — moves order through production stages
const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
};

module.exports = { createOrder, getMyOrders, getAllOrders, trackOrder, updateOrderStatus };
