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

// Define your admin routes below
router.post('/', createAdmin); // Route for creating a new admin
router.get('/', getAdmins); // Route for fetching all admins
router.get('/:uid', getAdminById); // Route for fetching an admin by ID
router.put('/:uid', updateAdminById); // Route for updating an admin by ID
router.delete('/:uid', deleteAdminById); // Route for deleting an admin by ID

module.exports = router;
