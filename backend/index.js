import express from 'express';
import userRoutes from './routes/userRoutes.js'
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import product from './routes/productRoute.js';
import cors from 'cors';

dotenv.config();

const port = 3000;

const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({ 
    origin: [ 
      'http://localhost:5000', 
    ], 
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'], 
    credentials: true, 
    exposedHeaders: ['*', 'Authorization' ] 
  }));

app.use('/api', userRoutes);

app.use('/', product);


app.get('/', (req, res) => res.send('Server is running'));

app.listen(port, () => {
    console.log(`Port ${port}`);
})


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

connectDB();
