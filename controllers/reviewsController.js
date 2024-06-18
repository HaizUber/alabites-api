const Review = require('../models/Reviews');
const Product = require('../models/Product');
const mongoose = require('mongoose');

// Function to create a new review
const createReview = async (req, res) => {
    try {
        const { userId, productId, rating, reviewText } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ error: 'Invalid userId or productId' });
        }

        // Ensure the product exists before creating a review
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const newReview = new Review({
            userId,
            productId,
            rating,
            reviewText
        });

        const savedReview = await newReview.save();

        // Update the product with the new review
        product.reviews.push(savedReview._id);
        product.averageRating = calculateAverageRating(product); // Update average rating
        product.numberOfReviews += 1;
        await product.save();

        res.status(201).json(savedReview);
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Helper function to calculate average rating
const calculateAverageRating = (product) => {
    if (product.reviews.length === 0) return 0;

    const totalRating = product.reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / product.reviews.length;
};

module.exports = {
    createReview
};
