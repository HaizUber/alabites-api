const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
        type: String, // Add firstName field
        required: true
    },
    lastName: {
        type: String, // Add lastName field
        required: true
    },
    username: {
        type: String,
        required: true
    },
    studentNumber: {
        type: String,
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

module.exports = mongoose.model('User', userSchema);
