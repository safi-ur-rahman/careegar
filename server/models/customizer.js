const mongoose = require('mongoose')
const { Schema } = mongoose

const customizerSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    workshop_name: {
        type: String,
    },
    workshop_address: {
        type: String,
    },
    workshop_city: {
        type: String,
    },
    workshop_description: {
        type: String,
    },
    tags: {
        type: [String],
        default: []
    }
})

const CustomizerModel = mongoose.model('Customizer', customizerSchema);

module.exports = CustomizerModel;