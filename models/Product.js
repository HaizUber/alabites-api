const mongoose = require('mongoose');
const Review = require('./Review'); // Assuming your review model is defined in 'review.js'

const productSchema = new mongoose.Schema({
    pid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    store: {
        type: String,
        required: true
    },
    productPhotos: {
        type: [String],
        required: false
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    tags: {
        type: [String],
        required: false
    },
    discount: {
        type: Number,
        required: false,
        default: 0
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true },
    id: false,
});

module.exports = mongoose.model('Product', productSchema);
