const { createStore, getStores, getStoreById, updateStoreById, deleteStoreById } = require('../controllers/storeController');
const router = require('express').Router();

// CORS middleware
router.use((req, res, next) => {
  // Allow requests from allowed origins
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Define your store routes below
router.post('/:storeName', createStore); // Route for creating a new store
router.get('/', getStores); // Route for fetching all stores
router.get('/:id', getStoreById); // Route for fetching a store by ID
router.put('/:id', updateStoreById); // Route for updating a store by ID
router.delete('/:id', deleteStoreById); // Route for deleting a store by ID

module.exports = router;
