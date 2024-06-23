const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    serviceId: {
        type: Schema.Types.ObjectId,
        ref: 'Services',
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    mechanic_id: {
        type: Schema.Types.ObjectId,
        ref: 'Mechanic',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /\d{2}:\d{2}/.test(v);
            },
            message: props => `${props.value} is not a valid time format!`
        }
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        default: []
    },
    atMechanic: {
        type: Boolean,
        required: true
    },
    mechanicDescr: {
        type: String,
    },
    mechanicPrice: {
        type:String
    }
});

const BookingService = mongoose.model('Booking', bookingSchema);
module.exports = BookingService;