const express = require('express');
const router = express.Router();
const helmet = require('helmet');
const { createReview, getReviewsByProduct } = require('../controllers/reviewsController');

// CORS middleware
const allowedOrigins = ['http://localhost:3000', 'https://alabites-ordering-app.vercel.app'];
router.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Security middleware
router.use(helmet());

// Define your review routes below
/**
 * @route POST /reviews/:productId
 * @desc Create a new review for a specific product
 * @access Public (can be adjusted based on your authentication needs)
 */
router.post('/:productId', createReview);

/**
 * @route GET /reviews/:productId
 * @desc Get all reviews for a product
 * @access Public
 */
router.get('/:productId', getReviewsByProduct);

module.exports = router;
