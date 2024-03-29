import express from "express";
import Order from "../models/CheckoutModel.js";
const router = express.Router();
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Stripe from "stripe";

const sampleUser = {
  id: "u1",
  name: "John Doe",
  email: "john.doe@example.com",
  number: "1234567890",
  address: "123 Main St, Anytown, USA",
};

const sampleProducts = [
  {
    name: "Sample Product 1",
    price: 1000,
    productImages: "https://example.com/product-image1.jpg",
  },
  {
    name: "Sample Product 2",
    price: 2000,
    productImages: "https://example.com/product-image2.jpg",
  },
];

const sampleOrder = {
  userId: sampleUser.id,
  userName: sampleUser.name,
  userEmail: sampleUser.email,
  userNumber: sampleUser.number,
  userAddress: sampleUser.address,
  items: sampleProducts,
  total: 3000,
  paymentMethod: "COD",
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

router.post("/payment", async (req, res) => {
  const { order, paymentMethod } = req.body;

  // Create a new order using the Order model
  const newOrder = new Order({
    _id: mongoose.Types.ObjectId(),
    userId: order.userId,
    userName: order.userName,
    userEmail: order.userEmail,
    userNumber: order.userNumber,
    userAddress: order.userAddress,
    items: order.items,
    total: order.total,
    paymentMethod: order.paymentMethod,
  });

  try {
    // Save the order to the database
    const savedOrder = await newOrder.save();
    const charge = await stripe.paymentIntents.create({
      amount: Math.round(order.total * 100),
      currency: "usd",
      description: "Order",
      payment_method_types: ["card"],
      setup_future_usage: "off_session",
    });

    // Save the Stripe charge ID to the order
    savedOrder.stripeChargeId = charge.id;
    await savedOrder.save();

    console.log("Order saved with user information:", savedOrder);

    res.send(savedOrder);
  } catch (error) {
    console.error("Error saving order:", error.message);
    res.status(500).send("Server error");
  }
});

export const processPayment = async (order) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: order.total,
    currency: "usd",
    payment_method_types: ["card"],
    setup_future_usage: "off_session",
    metadata: {
      userId: order.userId,
      userName: order.userName,
      userEmail: order.userEmail,
      productNames: order.items.map((item) => item.name).join(", "),
      productPrices: order.items.map((item) => item.price).join(", "),
    },
  });

  console.log("Payment intent created with user information:", paymentIntent);

  return paymentIntent;
};

export default router;
