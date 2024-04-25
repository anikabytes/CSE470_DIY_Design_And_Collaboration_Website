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


export default router
