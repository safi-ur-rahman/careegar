const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    products: [{
        product_id: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1 // Default quantity is 1
        }
    }]
});

const CartModel = mongoose.model('Cart', cartSchema);

module.exports = CartModel;
