const mongoose = require('mongoose')
const { Schema } = mongoose

const carOwnerSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    car_make: {
        type: String,
    },
    car_model: {
        type: String,
    },
    car_submodel: {
        type: String,
    },
    car_year: {
        type: String,
    }
})

const CarOwnerModel = mongoose.model('CarOwner', carOwnerSchema);

module.exports = CarOwnerModel;