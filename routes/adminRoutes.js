const { createAdmin, getAdmins, getAdminById, updateAdminById, deleteAdminById, getAdminByQuery } = require('../controllers/adminController');
const router = require('express').Router();

// Define your admin routes below
router.post('/', createAdmin); // Route for creating a new admin
router.get('/', getAdmins); // Route for fetching all admins
router.get('/query/:query', getAdminByQuery); // Route for querying admins by UID, email, username, or role
router.get('/:uid', getAdminById); // Route for fetching an admin by ID
router.put('/:uid', updateAdminById); // Route for updating an admin by UID
router.delete('/:uid', deleteAdminById); // Route for deleting an admin by ID


module.exports = router;
