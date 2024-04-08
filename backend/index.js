import express from 'express';
import userRoutes from './routes/userRoutes.js'
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import product from './routes/productroute.js';
import cors from 'cors';
import ord from './controllers/order.js';
dotenv.config();

const port = 3000;

const app = express();

app.use(cookieParser());

app.use(express.json({limit: '200mb', extended: true}));
app.use(express.urlencoded({limit: '200mb', extended: true}));
app.use(express.text({ limit: '200mb' }));

app.use(cors({ 
    origin: [ 
      'http://localhost:5000', 
    ], 
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'], 
    credentials: true, 
    exposedHeaders: ['*', 'Authorization' ] 
  }));

app.use('/api', userRoutes);



app.get('/', (req, res) => res.send('Server is running'));

app.use('/order',ord);

app.listen(port, () => {
    console.log(`Port ${port}`);
})

app.use('/dress',product);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDB connected");
    }
    catch (err){
        console.log("Error: " + err.message);
        process.exit(1);
    }
}

app.use('/clothes',product);
const sampleUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    number: '1234567890',
    address: '123 Main St, Anytown, USA',
};

const sampleProducts = [
    {
      name: 'Sample Product 1',
      price: 1000,
      productImages: 'https://example.com/product-image1.jpg',
    },
    {
      name: 'Sample Product 2',
      price: 2000,
      productImages: 'https://example.com/product-image2.jpg',
    },
];

const sampleOrder = {
    user: sampleUser,
    items: sampleProducts,
    total: 3000,
    paymentMethod: 'card',
};
let paymentIntent;

app.post('/order/payment', async (req, res) => {
    const order = {
      id: sampleUser.id,
      user: sampleUser.name,
      items: sampleProducts,
      total: 3000,
      paymentMethod: 'card',
    };
    const paymentIntent = await ord.processPayment(order);


    res.send(paymentIntent);
});
app.get('/order/payment', async (req, res) => {


    if (!paymentIntent) {

      return res.status(400).send({ error: 'NO Payment intent is found' });
    }
    const paymentIntentId = paymentIntent.id;
    try {
        const retrievedPaymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
        res.send(retrievedPaymentIntent);
      } catch (error) {
        console.error(error.message);
    
        res.status(500).send({ error: 'Failed to retrieve payment intent' });
      }
    });

connectDB();
