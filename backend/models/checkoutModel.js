import mongoose from "mongoose";

const checkoutSchema = mongoose.Schema({
    username: {
        type: String,
        default: ''
    },

    email: {
        type: String,
        default: ''
    },

    address: {
        type: String,
        default: ''
    },

    order: {
        type: [Object],
        default: []
    }

});

const Checkout = mongoose.model('Checkout', checkoutSchema);


export default Checkout;
