<<<<<<< Updated upstream
import mongoose from "mongoose";

const productSchema=mongoose.Schema({
    name: {
        type: String,
        required: true
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
    }
});

const Product = mongoose.model('Product', productSchema);
=======
import mongoose from "mongoose";

const productSchema=mongoose.Schema({
    name: {
        type: String,
        required: true
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
    }
});

const Product = mongoose.model('Product', productSchema);
>>>>>>> Stashed changes
export default Product;