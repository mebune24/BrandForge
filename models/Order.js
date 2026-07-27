const mongoose = require("mongoose");
const crypto = require("crypto");

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
    color: { type: String },
    size: { type: String },
    printingOption: { type: String },
    designUrl: { type: String }, // uploaded logo/design file
    unitPrice: { type: Number, required: true },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderCode: { type: String, unique: true }, // acts like the "QR code reference" from the plan
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: [
        "pending_payment",
        "paid",
        "in_design",
        "in_production",
        "quality_check",
        "packaging",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
      default: "pending_payment",
    },
    deliveryAddress: { type: String, required: true },
    paymentReference: { type: String },
  },
  { timestamps: true }
);

// Auto-generate a unique order code before saving, e.g. BF-7F3A9C21
orderSchema.pre("save", function (next) {
  if (!this.orderCode) {
    this.orderCode = "BF-" + crypto.randomBytes(4).toString("hex").toUpperCase();
  }
  next();
});

module.exports = mongoose.model("Order", orderSchema);
