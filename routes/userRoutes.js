const express = require('express');
const router = express.Router();
const helmet = require('helmet');
const {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getUsersByQuery,
  spendCurrencyFromUser,
  addTransactionToUser
} = require('../controllers/userController');

// CORS middleware
const allowedOrigins = ['http://localhost:3000', 'https://alabites-ordering-app.vercel.app'];
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

// Define your user routes below
/**
 * @route POST /users
 * @desc Create a new user
 * @access Secure
 */
router.post('/', createUser);

/**
 * @route GET /users
 * @desc Get all users
 * @access Public
 */
router.get('/', getUsers);

/**
 * @route GET /users/query/:query
 * @desc Get users by query
 * @access Public
 */
router.get('/query/:query', getUsersByQuery);

/**
 * @route GET /users/:uid
 * @desc Get user by UID
 * @access Public
 */
router.get('/:uid', getUserById);

/**
 * @route PUT /users/:uid
 * @desc Update user by UID
 * @access Secure
 */
router.put('/:uid', updateUserById);

/**
 * @route DELETE /users/:uid
 * @desc Delete user by UID
 * @access Secure
 */
router.delete('/:uid', deleteUserById);

/**
 * @route PATCH /users/:uid/spend-currency
 * @desc Spend currency from a user
 * @access Secure
 */
router.patch('/:uid/spend-currency', spendCurrencyFromUser);

/**
 * @route POST /users/:uid/transaction
 * @desc Add a transaction to user's history
 * @access Secure
 */
router.post('/:uid/transaction', addTransactionToUser);

module.exports = router;
