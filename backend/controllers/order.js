import express from "express";
import bodyParser from "body-parser";

const router = express.Router();

router.use(bodyParser.json());

let savedOrder = null; 

router.post('/saveOrder', (req, res) => {
  const order = req.body.order;
  console.log('Received order from frontend:', order);
  savedOrder = order; // Save the received order
  res.send({ message: 'Order received successfully' });
});

router.get('/saveOrder', (req, res) => {
  // Check if the order exists
  if (savedOrder) {
    res.send({ order: savedOrder });
  } else {
    res.status(404).send({ message: 'Order not found' });
  }
});

router.get('/order/hello', async (req, res) => {
  try {
    const be = ['a', 'b']; // Sample data
    res.send({ message: 'order is done!!!', orders: be });
  } catch (error) {
    console.error('Failed to retrieve orders', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
