const mongoose = require('mongoose');
const Review = require('../models/Review');
const Product = require('../models/Product');

// Create a new review
const createReview = async (req, res) => {
    const { user, product, rating, comment } = req.body;

    try {
        // Check if the product exists
        const existingProduct = await Product.findById(product);
        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Create a new review
        const review = new Review({
            user,
            product,
            rating,
            comment
        });

        await review.save();

        // Update product's reviews and calculate average rating
        existingProduct.reviews.push(review._id);
        await existingProduct.calculateAverageRating();

        res.status(201).json(review);
    } catch (err) {
        console.error('Error creating review:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a review by ID
const updateReviewById = async (req, res) => {
    const reviewId = req.params.reviewId;
    const { rating, comment } = req.body;

    try {
        const updatedReview = await Review.findByIdAndUpdate(reviewId, { rating, comment }, { new: true });
        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Update associated product's average rating
        const product = await Product.findById(updatedReview.product);
        if (product) {
            await product.calculateAverageRating();
        }

        res.json(updatedReview);
    } catch (err) {
        console.error('Error updating review:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a review by ID
const deleteReviewById = async (req, res) => {
    const reviewId = req.params.reviewId;

    try {
        const deletedReview = await Review.findByIdAndDelete(reviewId);
        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Update associated product's reviews and average rating
        const product = await Product.findById(deletedReview.product);
        if (product) {
            product.reviews = product.reviews.filter(rId => !rId.equals(deletedReview._id));
            await product.calculateAverageRating();
        }

        res.json({ message: 'Review deleted successfully' });
    } catch (err) {
        console.error('Error deleting review:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createReview,
    updateReviewById,
    deleteReviewById
};
