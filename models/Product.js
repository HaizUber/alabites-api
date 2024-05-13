const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    pid: {
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
    category: {
        type: String,
        enum: ['snack', 'breakfast', 'lunch', 'beverage'],
        required: true
    },
    productphoto: { // New field to store the photo reference
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Product', productSchema);
