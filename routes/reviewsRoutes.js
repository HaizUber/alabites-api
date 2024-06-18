// Backend routes
const express = require('express');
const router = express.Router();
const { createReview, getReviewsByProduct } = require('../controllers/reviewsController');

router.post('/reviews/:productId', createReview); // Updated endpoint
router.get('/reviews/product/:productId', getReviewsByProduct);

module.exports = router;
