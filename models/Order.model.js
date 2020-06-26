const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    customerId: {
        type: String,
        required: true
    },
    products: [{
        productId: { type: String, required: true },
        name: {type: String, required: true},
        amount: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    deliveryOption: {
        type: Number,
        required: true
    },
    shippingAddress: {
        name: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipcode: { type: String, required: true }
    },
    billingAddress: {
        name: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipcode: { type: String, required: true }
    },
    totalPrice: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', OrderSchema);
