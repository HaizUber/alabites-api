const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value for rating'
        }
    },
    reviewText: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware to populate userId and productId fields with corresponding documents
reviewSchema.pre('find', function(next) {
    this.populate('userId').populate('productId');
    next();
});

module.exports = mongoose.model('Review', reviewSchema);
