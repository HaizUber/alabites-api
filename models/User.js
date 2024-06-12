const mongoose = require('mongoose');

// Define a schema for transactions
const transactionSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['credit', 'debit'], // Type of transaction: credit or debit
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: false
    }
});

const userSchema = new mongoose.Schema({
    uid: {
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
    studentNumber: {
        type: String,
        required: true
    },
    studentavatar: {
        type: String,
        required: false
    },
    currencyBalance: {
        type: Number,
        default: 0, // Initialize the balance to 0
        required: true
    },
    transactionHistory: [transactionSchema], // Array of transaction documents
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
