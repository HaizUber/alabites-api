const Review = require('../models/Review'); // Assuming Review model is defined in models/Review.js

// Function to create a new review
exports.createReview = async (req, res) => {
    try {
        const { userId, productId, rating, reviewText } = req.body;

        // Create new review instance
        const newReview = new Review({
            userId,
            productId,
            rating,
            reviewText
        });

        // Save the review to the database
        const savedReview = await newReview.save();

        res.status(201).json(savedReview); // Respond with the saved review
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Function to get all reviews for a product
exports.getReviewsByProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        // Fetch reviews from the database based on productId
        const reviews = await Review.find({ productId });

        if (reviews.length === 0) {
            return res.status(404).json({ message: 'No reviews found for this product.' });
        }

        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};
