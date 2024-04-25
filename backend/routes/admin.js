import express from "express";
import Product from "../models/productModel.js";


const router = express.Router();


  router.delete('/designs/:id', async (request, response) => {
    try {
      const  id  = request.params.id;
      const result = await Product.findByIdAndDelete(id);
  
      if (!result) {
        return response.status(404).json({ message: 'Product not found' });
      }
  
      return response.status(200).send({ message: 'Product deleted successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
router.delete('/checkout/:id', async (request, response) => {
    try {
      const  id  = request.params.id;
      const result = await Checkout.findByIdAndDelete(id);
  
      if (!result) {
        return response.status(404).json({ message: 'Order not found' });
      }
  
      return response.status(200).send({ message: 'Order Confirmed' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
router.get('/checkout', async (request, response) => {
    try {
      const items = await Checkout.find({});
      return response.status(200).json({
        count: items.length,
        data: items,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });


export default router
