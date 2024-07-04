const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    firebaseUID: {
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
    avatar: {
        type: String, // Store base64 photo link
        required: false // Make it optional
    },
    aboutMe: {
        type: String,
        default: "" 
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Admin', adminSchema);
