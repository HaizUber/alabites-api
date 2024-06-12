const { 
  createUser, 
  getUsers, 
  getUserById, 
  updateUserById, 
  deleteUserById, 
  getUsersByQuery, 
  addCurrencyToUser, 
  spendCurrencyFromUser ,
  addTransactionToUser
} = require('../controllers/userController');
const router = require('express').Router();

// CORS middleware
router.use((req, res, next) => {
// Allow requests from allowed origins
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
next();
});

// Define your user routes below
router.post('/', createUser); // Route for creating a new user
router.get('/', getUsers); // Route for fetching all users
router.get('/query/:query', getUsersByQuery); // Route for querying users by field
router.get('/:uid', getUserById); // Route for fetching a user by UID
router.put('/:uid', updateUserById); // Route for updating a user by UID
router.delete('/:uid', deleteUserById); // Route for deleting a user by UID

// New routes for currency operations
router.post('/:uid/add-currency', addCurrencyToUser); // Route for adding currency to a user
router.post('/:uid/spend-currency', spendCurrencyFromUser); // Route for spending currency from a user
router.put('/:uid/transaction', addTransactionToUser); // Route for adding a transaction to user's history

module.exports = router;
