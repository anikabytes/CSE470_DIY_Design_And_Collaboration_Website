import express from 'express';
import userRoutes from './routes/userRoutes.js'
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import product from './routes/productroute.js';
import cors from 'cors';

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

app.listen(port, () => {
    console.log(`Port ${port}`);
})

const clothes = express();
clothes.use(express.json());
clothes.use(cors());
clothes.use('/dress',product);

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
