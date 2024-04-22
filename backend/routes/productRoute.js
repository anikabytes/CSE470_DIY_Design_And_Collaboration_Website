import express from "express";
import Product from "../models/productModel.js";

const router = express.Router();

router.get('/clothes', async (request, response) => {
    try {
      const items = await Product.find({});
  
      return response.status(200).json({
        count: items.length,
        data: items,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

export default router;