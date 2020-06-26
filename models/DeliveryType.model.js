const mongoose = require('mongoose');

const DeliveryTypeSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    minDeliveryDate: {
        type: Number,
        required: true
    },
    maxDeliveryDate: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('DeliveryType', DeliveryTypeSchema, 'deliveryTypes');