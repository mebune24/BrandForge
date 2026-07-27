const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ["apparel", "merchandise", "uniform", "safety_wear", "other"],
      default: "apparel",
    },
    description: { type: String },
    basePrice: { type: Number, required: true }, // price before printing/embroidery add-ons
    availableColors: [{ type: String }],
    availableSizes: [{ type: String }],
    printingOptions: [
      { type: String, enum: ["screen_printing", "heat_transfer", "sublimation", "dtf", "vinyl", "embroidery"] },
    ],
    imageUrl: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
