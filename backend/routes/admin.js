import express from "express";
import Order from '../models/orderModel';
import Product from "../models/storeItems";
const router = express.Router();

router.get('/orders', async(req,res)  => {
    try{const order = await Order.find({});
    return res.status(200).json(order);
    }
    catch (error) {res.status(500).send({message: error.message})}    
});

router.get('/oredrs/:searchString', async (request, response) => {
    const searchString = request.params.searchString;
    const regex = new RegExp(searchString, 'i');
    try{const order = await Order.find({});
    return res.status(200).json(order);
    }
    catch (error) {res.status(500).send({message: error.message})}
  });

router.delete('/orders/:id',  async (req, res) => {
    try{
    const { id } = request.params.id;
    const result = await Order.findByIdAndDelete(id);
    if (!result) {
        return response.status(404).json({ message: 'Order not found' });
      }
  
    return response.status(200).send({ message: 'Order deleted successfully' });
    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})


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

router.delete('/designs/:id', async (req, res) => {
    try{
    const { id } = request.params.id;
    const result = await Product.findByIdAndDelete(id);
    if (!result) {
        return response.status(404).json({ message: 'Product not found' });
      }
  
    return response.status(200).send({ message: 'Product deleted successfully' });
    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})

router.get('/designs/:searchString', async (request, response) => {
    const searchString = request.params.searchString;
    const regex = new RegExp(searchString, 'i');
    try {
      const products = await Product.find({ name: regex });
      response.json(products);
    } catch (err) {
      response.status(500).json({ message: 'Error searching for products', error: err });
    }
  });
export default router