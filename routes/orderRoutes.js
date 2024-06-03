const { createOrder, getOrders, getOrderByOrderNumber, updateOrderById, deleteOrderById, getOrderByQuery } = require('../controllers/orderController');
const router = require('express').Router();

// CORS middleware
router.use((req, res, next) => {
  // Allow requests from allowed origins
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Define your order routes below
router.post('/', createOrder); // Route for creating a new order
router.get('/', getOrders); // Route for fetching all orders
router.get('/query/:query', getOrderByQuery); // Route for querying orders by order number, customer name, email, or status
router.get('/:orderNumber', getOrderByOrderNumber); // Route for fetching an order by order number
router.put('/:id', updateOrderById); // Route for updating an order by ID
router.delete('/:id', deleteOrderById); // Route for deleting an order by ID

module.exports = router;
