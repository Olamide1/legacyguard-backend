// routes/user.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');

// @route   PUT api/user/trusted-contacts
// @desc    Update trusted contacts
// @access  Private
router.put('/trusted-contacts', auth, userController.updateTrustedContacts);

// @route   PUT api/user/emergency-access-conditions
// @desc    Update emergency access conditions
// @access  Private
router.put('/emergency-access-conditions', auth, userController.updateEmergencyAccessConditions);

// @route   GET api/user/onboarding-complete
// @desc    Check if onboarding is complete
// @access  Private
router.get('/onboarding-complete', auth, userController.checkOnboardingComplete);

router.get('/trusted-contacts', auth, userController.getTrustedContacts);

// @route   GET api/user/emergency-access-conditions
// @desc    Get emergency access conditions
// @access  Private
router.get('/emergency-access-conditions', auth, userController.getEmergencyAccessConditions);

// @route   GET api/user/onboarding-complete
// @desc    Check if onboarding is complete
// @access  Private
router.get('/onboarding-complete', auth, userController.checkOnboardingComplete);

module.exports = router;
