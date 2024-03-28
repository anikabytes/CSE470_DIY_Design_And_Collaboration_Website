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


const newProduct = new Product({
    name: 'Example Product',
    price: 19.99,
    description: 'This is an example product description.',
    productImages: 'http://tinyurl.com/DIY-Tshirt1', // URL to the image
    designedby: 'admin'
});

newProduct.save()
    .then(() => {
        console.log('Product added successfully');
    })
    .catch((err) => {
        console.error('Error adding product:', err);
    });

export default Product;
