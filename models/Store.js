const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    storeName: {
        type: String,
        required: true
    },
    storeId: {
        type: String,
        required: true,
        unique: true
    },
    storeType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    storeOwner: {
        type: String, 
        required: true
    },
    storePicture: {
        type: String, 
        required: false // Optional field for store picture
    },
    gcashNumber: {
        type: Number,  // Accepts only numbers
        required: false // Optional field for GCash number
    },
    gcashQR: {
        type: String,   // Accepts a string for GCash QR code
        required: false // Optional field for GCash QR
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

module.exports = mongoose.model('Store', storeSchema);
