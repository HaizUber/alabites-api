const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        index: true // Adding index for faster queries on product reviews
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now // Set default value to current date/time
    }
});

// Middleware to update the 'updatedAt' field on document update
reviewSchema.pre('findOneAndUpdate', function(next) {
    this.set({ updatedAt: new Date() });
    next();
});

// Static method to calculate average rating for a product
reviewSchema.statics.calculateAverageRating = async function(productId) {
    const Review = this;
    const reviews = await Review.find({ product: productId });

    if (reviews.length === 0) {
        return 0; // Return 0 if there are no reviews
    }

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / reviews.length;
};

module.exports = mongoose.model('Review', reviewSchema);
