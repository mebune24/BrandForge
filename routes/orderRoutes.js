const express = require("express");
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  trackOrder,
  updateOrderStatus,
} = require("../controllers/orderController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/mine", protect, getMyOrders);
router.get("/track/:orderCode", trackOrder); // public tracking by order code
router.get("/", protect, authorize("admin", "staff"), getAllOrders);
router.put("/:id/status", protect, authorize("admin", "staff"), updateOrderStatus);

module.exports = router;
