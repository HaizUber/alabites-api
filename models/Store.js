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
    storepicture: {
        type: String, 
        required: false // Make it optional
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


module.exports = mongoose.model('Store', storeSchema);
