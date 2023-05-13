import mongoose from "mongoose";
``;
const Schema = mongoose.Schema;

const OrderSchema = mongoose.Schema({
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
      // price
    },
  ],
  bill: {
    type: Number,
    required: true,
    default: 0,
  },
  address: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },

  notes: {
    type: String,
  },
  date_added: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("order", OrderSchema);
export default Order;
