const mongoose = require('mongoose');
const Review = require('./Review'); // Assuming your review model is defined in 'review.js'

const productSchema = new mongoose.Schema({
    pid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    store: {
        type: String,
        required: true
    },
    productPhotos: {
        type: [String],
        required: false
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    tags: {
        type: [String],
        required: false
    },
    discount: {
        type: Number,
        required: false,
        default: 0
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    averageRating: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true },
    id: false,
});

// Middleware to update 'updatedAt' field on document update
productSchema.pre('findOneAndUpdate', function(next) {
    this.set({ updatedAt: new Date() });
    next();
});

// Method to calculate and update average rating
productSchema.methods.calculateAverageRating = async function() {
    const reviews = await Review.find({ product: this._id });

    if (reviews.length === 0) {
        this.averageRating = 0;
    } else {
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        this.averageRating = totalRating / reviews.length;
    }

    await this.save();
};

module.exports = mongoose.model('Product', productSchema);
