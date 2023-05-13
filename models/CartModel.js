import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CartSchema = mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  bill: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Cart = mongoose.model("Cart", CartSchema);
export default Cart;