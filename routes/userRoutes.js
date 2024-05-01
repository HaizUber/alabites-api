const { createUser, getUsers, getUserById } = require('../controllers/userController');
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
router.get('/:id', getUserById); // Route for fetching a user by ID

module.exports = router;
