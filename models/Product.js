const mongoose = require('mongoose');

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
    productPhotos: { // Array to store multiple photo URLs
        type: [String],
        required: false
    },
    stock: { // Field for stock management
        type: Number,
        required: true,
        default: 0
    },
    tags: { // Field for product tags
        type: [String],
        required: false
    },
    discount: { // Field for discounts
        type: Number,
        required: false,
        default: 0
    },
    averageRating: { // Field for average rating
        type: Number,
        required: false,
        default: 0
    },
    numberOfReviews: { // Field for the number of reviews
        type: Number,
        required: false,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);
