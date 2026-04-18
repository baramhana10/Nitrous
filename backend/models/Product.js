import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    tagline: { type: String },
    price: { type: String, required: true },
    category: { type: String, required: true },
    categoryName: { type: String },
    images: [{ type: String, required: true }], // Array of URL paths to images
    specs: {
      range: { type: String },
      power: { type: String },
      acceleration: { type: String },
      topSpeed: { type: String },
    },
    features: [{ type: String }],
    badge: { type: String },
    tags: [{ type: String }], // Array for: عروض, جديد, الأكثر مبيعاً
    quantity: { type: Number, default: null }, // null = unlimited, 0 = sold out
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
