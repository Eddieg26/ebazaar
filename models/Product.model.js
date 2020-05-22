const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    gallaryUrl: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    brandId: {
        type: Number,
        required: true
    },
    categoryId: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', ProductSchema);