const express = require('express');
const router = express.Router();
const helmet = require('helmet');
const cors = require('cors');
const { createReview, getReviewsByProduct } = require('../controllers/reviewsController');

// CORS middleware
const allowedOrigins = ['http://localhost:3000', 'https://alabites-ordering-app.vercel.app'];
router.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type']
}));

// Security middleware
router.use(helmet());

// Define your review routes below
/**
 * @route POST /products/:productId/reviews
 * @desc Create a new review for a specific product
 * @access Public (can be adjusted based on your authentication needs)
 */
router.post('/products/:productId/reviews', createReview);

/**
 * @route GET /products/:productId/reviews
 * @desc Get all reviews for a product
 * @access Public
 */
router.get('/products/:productId/reviews', getReviewsByProduct);

module.exports = router;
