import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
  user: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  items: [
    {
      product: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Order = mongoose.model('Order', OrderSchema);

export default Order;