const mongoose = require('mongoose');
const Review = mongoose.model('Review');
const Product = mongoose.model('Product');

// Create a new review
exports.createReview = async (req, res) => {
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

        // Update product's average rating and number of reviews
        existingProduct.numberOfReviews += 1;
        existingProduct.averageRating = (existingProduct.averageRating * (existingProduct.numberOfReviews - 1) + rating) / existingProduct.numberOfReviews;
        await existingProduct.save();

        res.status(201).json(review);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get reviews for a specific product
exports.getReviewsByProduct = async (req, res) => {
    const productId = req.params.productId;

    try {
        const reviews = await Review.find({ product: productId }).populate('user', 'username');
        res.json(reviews);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a review by ID
exports.getReviewById = async (req, res) => {
    const reviewId = req.params.reviewId;

    try {
        const review = await Review.findById(reviewId).populate('user', 'username');
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json(review);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a review by ID
exports.updateReviewById = async (req, res) => {
    const reviewId = req.params.reviewId;
    const { rating, comment } = req.body;

    try {
        const updatedReview = await Review.findByIdAndUpdate(reviewId, { rating, comment }, { new: true });
        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // If the rating is updated, update product's average rating
        const product = await Product.findById(updatedReview.product);
        if (product) {
            const oldRating = updatedReview.rating;
            product.averageRating = (product.averageRating * product.numberOfReviews - oldRating + rating) / product.numberOfReviews;
            await product.save();
        }

        res.json(updatedReview);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a review by ID
exports.deleteReviewById = async (req, res) => {
    const reviewId = req.params.reviewId;

    try {
        const deletedReview = await Review.findByIdAndDelete(reviewId);
        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Update product's average rating and number of reviews
        const product = await Product.findById(deletedReview.product);
        if (product) {
            product.numberOfReviews -= 1;
            if (product.numberOfReviews === 0) {
                product.averageRating = 0;
            } else {
                const oldRating = deletedReview.rating;
                product.averageRating = (product.averageRating * (product.numberOfReviews + 1) - oldRating) / product.numberOfReviews;
            }
            await product.save();
        }

        res.json({ message: 'Review deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
