const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productName: {
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
    availableStock: {
        type: Number,
        required: true
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

let ProductModel;

try {
    ProductModel = mongoose.model('products');
} catch (error) {
    ProductModel = mongoose.model('products', ProductSchema);
}

module.exports = ProductModel;
