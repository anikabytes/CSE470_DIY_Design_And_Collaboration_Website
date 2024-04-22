import mongoose from "mongoose";

const productSchema=mongoose.Schema({
    name: {
        type: String,
        required: true, 
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    productImages: {
        type: String,
        required: true
    },
    designedby: {
        type: String,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);


export default Product;
