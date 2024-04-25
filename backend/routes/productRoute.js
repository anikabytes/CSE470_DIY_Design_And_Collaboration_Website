import express from "express";
import Product from "../models/productModel.js";

const router = express.Router();

router.get('/', async (request, response) => {
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
  router.get('/search/:searchString', async (request, response) => {
    const searchString = request.params.searchString;
    console.log(searchString);
    const regex = new RegExp(searchString, 'i');
    try {
      const products = await Product.find({ name: regex });
      response.json(products);
    } catch (err) {
      response.status(500).json({ message: 'Error searching for products', error: err });
    }
  });

export default router;
