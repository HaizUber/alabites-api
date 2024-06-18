const mongoose = require('mongoose');

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

// Virtual field to calculate and store average rating
productSchema.virtual('averageRatingValue').get(function() {
    if (this.reviews.length === 0) {
        return 0;
    }

    const total = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    return total / this.reviews.length;
});

// Middleware to update average rating and number of reviews
productSchema.post('save', async function(doc) {
    const Review = mongoose.model('Review');

    // Calculate average rating
    const reviews = await Review.find({ product: doc._id });
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

    // Update product document
    await this.model('Product').findByIdAndUpdate(doc._id, {
        averageRating,
        numberOfReviews: reviews.length
    });
});

module.exports = mongoose.model('Product', productSchema);
