const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const twoFactorController = require('../controllers/twoFactorController');
const User = require('../models/User'); // Ensure this import is present

// @route   GET api/2fa/setup
// @desc    Setup 2FA
// @access  Private
router.get('/setup', auth, twoFactorController.setupTwoFactor);

// @route   POST api/2fa/verify
// @desc    Verify 2FA
// @access  Private
router.post('/verify', auth, twoFactorController.verifyTwoFactor);

// @route   POST api/2fa/login
// @desc    Verify 2FA during login
// @access  Public
router.post('/login', twoFactorController.verifyTwoFactorLogin); // Note: Added the verifyTwoFactorLogin method in the controller

module.exports = router;
