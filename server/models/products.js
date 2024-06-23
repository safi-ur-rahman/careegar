const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
    supplier_id: {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    product_description: {
        type: String,
        required: true
    },
    product_price: {
        type: String,
        required: true
    },
    product_quantity: {
        type: Number,
        required: true
    },
    product_availability: {
        type: Boolean,
        required: true
    },
    rating:{
        type: String
    },
    images: {
        type: [String],
        default: []
    }
})

const ProductModel = mongoose.model('Products', productSchema);

module.exports = ProductModel;