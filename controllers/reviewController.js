const mongoose = require('mongoose');
const Review = require('../models/Review');

// Function to create a new review
exports.createReview = async (req, res) => {
    try {
        const { userId, productId, rating, reviewText } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ error: 'Invalid userId or productId' });
        }

        const newReview = new Review({
            userId,
            productId,
            rating,
            reviewText
        });

        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Function to get all reviews for a product
exports.getReviewsByProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        console.log('Fetching reviews for productId:', productId);

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ error: 'Invalid productId' });
        }

        const reviews = await Review.find({ productId });
        console.log('Reviews found:', reviews);

        if (reviews.length === 0) {
            return res.status(404).json({ message: 'No reviews found for this product.' });
        }

        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};
