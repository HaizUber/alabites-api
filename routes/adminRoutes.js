const express = require('express');
const router = express.Router();
const helmet = require('helmet');
const { createAdmin, getAdmins, getAdminById, updateAdminById, deleteAdminById, getAdminByQuery, addCurrencyToUser, updateAboutMe } = require('../controllers/adminController');

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

// Define your admin routes below
/**
 * @route POST /admins
 * @desc Create a new admin
 * @access Secure
 */
router.post('/', createAdmin);

/**
 * @route GET /admins
 * @desc Get all admins
 * @access Public
 */
router.get('/', getAdmins);

/**
 * @route GET /admins/query/:query
 * @desc Get admins by query
 * @access Public
 */
router.get('/query/:query', getAdminByQuery);

/**
 * @route GET /admins/:uid
 * @desc Get admin by UID
 * @access Public
 */
router.get('/:uid', getAdminById);

/**
 * @route PUT /admins/:uid
 * @desc Update admin by UID
 * @access Secure
 */
router.put('/:uid', updateAdminById);

/**
 * @route DELETE /admins/:uid
 * @desc Delete admin by UID
 * @access Secure
 */
router.delete('/:uid', deleteAdminById);

/**
 * @route POST /admins/:uid/add-currency
 * @desc Add currency to a user
 * @access Secure
 */
router.post('/:uid/add-currency', addCurrencyToUser);

/**
 * @route PUT /admins/:uid/update-about-me
 * @desc Update about me section of an admin
 * @access Secure
 */
router.put('/:uid/update-about-me', updateAboutMe);


module.exports = router;
