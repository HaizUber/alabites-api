const express = require('express');
const router = express.Router();
const helmet = require('helmet');
const {
  createStore,
  getStores,
  getStoreById,
  updateStoreById,
  deleteStoreById,
  getStoreByQuery
} = require('../controllers/storeController');

// CORS middleware
const allowedOrigins = ['http://localhost:3000', 'https://alabites-ordering-app.vercel.app', 'https://alabites-admin-platform.vercel.app'];
router.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

// Security middleware
router.use(helmet());

// Define your store routes below
/**
 * @route POST /stores
 * @desc Create a new store
 * @access Secure
 */
router.post('/', createStore);

/**
 * @route GET /stores
 * @desc Get all stores
 * @access Public
 */
router.get('/', getStores);

/**
 * @route GET /stores/query/:query
 * @desc Get stores by query
 * @access Public
 */
router.get('/query/:query', getStoreByQuery);

/**
 * @route GET /stores/:storeId
 * @desc Get store by storeId
 * @access Public
 */
router.get('/:storeId', getStoreById);

/**
 * @route PUT /stores/:storeId
 * @desc Update store by storeId
 * @access Secure
 */
router.put('/:storeId', updateStoreById);

/**
 * @route DELETE /stores/:storeId
 * @desc Delete store by storeId
 * @access Secure
 */
router.delete('/:storeId', deleteStoreById);

module.exports = router;
