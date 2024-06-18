const Review = require('../models/review');
const Product = require('../models/product');

// Function to create a new review
exports.createReview = async (req, res) => {
    try {
        const { userId, productId, rating, reviewText } = req.body;

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Create a new review
        const newReview = new Review({
            userId,
            productId,
            rating,
            reviewText
        });

        // Save the review
        const savedReview = await newReview.save();

        // Update the product's average rating and number of reviews
        const reviews = await Review.find({ productId });
        const numberOfReviews = reviews.length;
        const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / numberOfReviews;

        product.numberOfReviews = numberOfReviews;
        product.averageRating = averageRating;
        product.reviews.push(savedReview._id);

        await product.save();

        res.status(201).json(savedReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to get all reviews for a product
exports.getReviewsByProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        // Find the reviews for the specified product
        const reviews = await Review.find({ productId }).populate('userId', 'username');

        if (!reviews) {
            return res.status(404).json({ message: 'No reviews found for this product' });
        }

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
