const mongoose = require('mongoose');

// Define a schema for transactions
const transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['tamcredits', 'card'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    orderId: {
        type: String,
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

// Method to add currency and log the transaction
userSchema.methods.addCurrency = async function(amount, description) {
    this.currencyBalance += amount;

    // Create a new transaction
    const transaction = {
        type: 'tamcredits',
        amount: amount,
        orderId: new mongoose.Types.ObjectId().toString(), // Generating a new ObjectId for the orderId
        description: description
    };

    // Add the transaction to the history
    this.transactionHistory.push(transaction);

    // Save the user document
    await this.save();
};

module.exports = mongoose.model('User', userSchema);
