const { createUser, getUsers, getUserById, updateUserById, deleteUserById } = require('../controllers/userController');
const { createAdmin, getAdmins, getAdminById, updateAdminById, deleteAdminById } = require('../controllers/adminController');
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
router.post('/users', createUser); // Route for creating a new user
router.get('/users', getUsers); // Route for fetching all users
router.get('/users/:id', getUserById); // Route for fetching a user by ID
router.put('/users/:id', updateUserById); // Route for updating a user by ID
router.delete('/users/:id', deleteUserById); // Route for deleting a user by ID

// Define your admin routes below
router.post('/admins', createAdmin); // Route for creating a new admin
router.get('/admins', getAdmins); // Route for fetching all admins
router.get('/admins/:id', getAdminById); // Route for fetching an admin by ID
router.put('/admins/:id', updateAdminById); // Route for updating an admin by ID
router.delete('/admins/:id', deleteAdminById); // Route for deleting an admin by ID

module.exports = router;
