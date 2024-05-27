const mongoose = require('mongoose')
const { Schema } = mongoose

const serviceSchema = new Schema({
    mechanic_id: {
        type: String,
        required: true
    },
    service_name: {
        type: String,
        required: true
    },
    service_description: {
        type: String,
        required: true
    },
    service_price: {
        type: String,
        required: true
    },
    service_availability: {
        type: Boolean,
        required: true
    },
    rating:{
        type: String
    },
    images: {
        type: [String], // String array for images
        default: [] // Default empty array
    },
    tags: {
        type: [String],
        default: []
    }
})

const ServiceModel = mongoose.model('Services', serviceSchema);

module.exports = ServiceModel;