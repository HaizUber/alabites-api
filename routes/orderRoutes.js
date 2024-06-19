const { createOrder, getOrders, getOrderById, updateOrderById, deleteOrderById, updateOrderStatusById } = require('../controllers/orderController');
const express = require('express');
const router = express.Router();
const helmet = require('helmet');

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

// Define your order routes below
/**
 * @route POST /orders
 * @desc Create a new order
 * @access Secure
 */
router.post('/', createOrder);

/**
 * @route GET /orders
 * @desc Get all orders
 * @access Public
 */
router.get('/', getOrders);

/**
 * @route GET /orders/:id
 * @desc Get order by ID
 * @access Public
 */
router.get('/:id', getOrderById);

/**
 * @route PUT /orders/:id
 * @desc Update order by ID
 * @access Secure
 */
router.put('/:id', updateOrderById);

/**
 * @route DELETE /orders/:id
 * @desc Delete order by ID
 * @access Secure
 */
router.delete('/:id', deleteOrderById);

/**
 * @route PATCH /orders/:id/status
 * @desc Update order status by ID
 * @access Secure
 */
router.patch('/:id/status', updateOrderStatusById);

module.exports = router;
