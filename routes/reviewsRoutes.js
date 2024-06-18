const express = require('express');
const router = express.Router();
const { createReview, getReviewsByProduct } = require('../controllers/reviewController');

/**
 * @route POST /reviews
 * @desc Create a new review
 * @access Public (can be adjusted based on your authentication needs)
 */
router.post('/reviews', createReview);

/**
 * @route GET /reviews/product/:productId
 * @desc Get all reviews for a product
 * @access Public
 */
router.get('/reviews/product/:productId', getReviewsByProduct);

module.exports = router;
