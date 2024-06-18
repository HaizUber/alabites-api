const Review = require('../models/Reviews');
const Product = require('../models/Product');
const mongoose = require('mongoose');

// Function to create a new review
exports.createReview = async (req, res) => {
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

        // Ensure the product exists before fetching reviews
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Fetch reviews for the product
        const reviews = await Review.find({ productId });
        console.log('Reviews found:', reviews);

        const productWithReviews = {
            ...product._doc,
            reviews
        };

        res.status(200).json(productWithReviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};
