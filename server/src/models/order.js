import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", 
    required: true
  }],
  shippingAddress1: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: "Pending"
  },
  totalPrice: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  dateOrdered: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Order", orderSchema);
