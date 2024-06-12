const { createAdmin, getAdmins, getAdminById, updateAdminById, deleteAdminById, getAdminByQuery, addCurrencyToUser } = require('../controllers/adminController');
const router = require('express').Router();

// CORS middleware
router.use((req, res, next) => {
  // Allow requests from allowed origins
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Define your admin routes below
router.post('/', createAdmin); // Route for creating a new admin
router.get('/', getAdmins); // Route for fetching all admins
router.get('/query/:query', getAdminByQuery); // Route for querying admins by UID, email, username, or role
router.get('/:uid', getAdminById); // Route for fetching an admin by ID
router.put('/:uid', updateAdminById); // Route for updating an admin by UID
router.delete('/:uid', deleteAdminById); // Route for deleting an admin by ID
router.post('/:uid/add-currency', addCurrencyToUser); // Route for adding currency to a user


module.exports = router;
