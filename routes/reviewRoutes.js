const express = require('express');
const router = express.Router();
const cors = require('cors');
const helmet = require('helmet');
const { createReview, getReviewsByProduct, getReviewById, updateReviewById, deleteReviewById } = require('../controllers/reviewController');
const Product = require('../models/Product'); // Correct path to Product model

// Define allowed origins
const allowedOrigins = ['http://localhost:3000', 'https://alabites-ordering-app.vercel.app'];

// CORS middleware configuration
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Apply CORS middleware
router.use(cors(corsOptions));

// Security middleware
router.use(helmet());

// Middleware to handle errors
const asyncHandler = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

/**
 * @route POST /reviews
 * @desc Create a new review
 * @access Secure
 */
router.post('/', asyncHandler(createReview));

/**
 * @route GET /reviews/product/:productId
 * @desc Get reviews for a specific product
 * @access Public
 */
router.get('/product/:productId', asyncHandler(getReviewsByProduct));

/**
 * @route GET /reviews/:reviewId
 * @desc Get a review by ID
 * @access Public
 */
router.get('/:reviewId', asyncHandler(getReviewById));

/**
 * @route PUT /reviews/:reviewId
 * @desc Update a review by ID
 * @access Secure
 */
router.put('/:reviewId', asyncHandler(updateReviewById));

/**
 * @route DELETE /reviews/:reviewId
 * @desc Delete a review by ID
 * @access Secure
 */
router.delete('/:reviewId', asyncHandler(deleteReviewById));

module.exports = router;
