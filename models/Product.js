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
    averageRating: {
        type: Number,
        required: false,
        default: 0
    },
    numberOfReviews: {
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
});

module.exports = mongoose.model('Product', productSchema);
