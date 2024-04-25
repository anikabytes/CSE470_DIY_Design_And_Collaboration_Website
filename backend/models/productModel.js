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

const image = `data:image/jpeg;base64,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`;
const Pname = 'Example Product';
const Pprice = 19.99;
const Pdescription = 'This is an example product description.';
const Pdesignedby = 'admin';

Product.findOne({ name: Pname })
    .then((existingProduct) => {
        if (!existingProduct) {
            const newProduct = new Product({
                name: Pname,
                price: Pprice,
                description: Pdescription,
                productImages: image, 
                designedby: Pdesignedby
            });
            console.log('Product added successfully');
            return newProduct.save();
        } else {
            console.log('Product already exists');
        }
    })
    .catch((err) => {
        console.error('Error adding product:', err);
    });


export default Product;
