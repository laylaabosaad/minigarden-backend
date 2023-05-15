import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  subcategory: {
    type: Schema.Types.ObjectId,
    ref: "subcategory",
    required: true,
  },
  stock: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
