const mongoose = require('mongoose')
const { Schema } = mongoose

const supplierSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    store_name: {
        type: String,
    },
    store_address: {
        type: String,
    },
    store_city: {
        type: String,
    },
    store_description: {
        type: String,
    }
})

const SupplierModel = mongoose.model('Supplier', supplierSchema);

module.exports = SupplierModel;