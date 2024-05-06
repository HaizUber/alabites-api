const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    firebaseUID: { // Add firebaseUID field
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['Overseer Admin', 'Merchant Admin', 'Manager']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    stores: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Store'
        }
    ]
});

module.exports = mongoose.model('Admin', adminSchema);
