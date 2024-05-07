const { createStore, getStores, getStoreById, updateStoreById, deleteStoreById, getStoreByQuery } = require('../controllers/storeController');
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
router.post('/', createStore); // Route for creating a new store
router.get('/', getStores); // Route for fetching all stores
router.get('/:storeId', getStoreById); // Route for fetching a store by storeId
router.put('/:storeId', updateStoreById); // Route for updating a store by storeId
router.delete('/:storeId', deleteStoreById); // Route for deleting a store by storeId
router.get('/query/:query', getStoreByQuery); // Route for fetching a store by storeId or storeName

module.exports = router;
