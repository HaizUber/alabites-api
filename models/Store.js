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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    }
});

module.exports = mongoose.model('Store', storeSchema);