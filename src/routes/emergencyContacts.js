const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const emergencyContactsController = require('../controllers/emergencyContactsController');

// @route   POST api/emergency-contacts
// @desc    Add emergency contact
// @access  Private
router.post('/', auth, emergencyContactsController.addEmergencyContact);

// @route   GET api/emergency-contacts
// @desc    Get all emergency contacts
// @access  Private
router.get('/', auth, emergencyContactsController.getEmergencyContacts);

// @route   DELETE api/emergency-contacts/:contactId
// @desc    Delete emergency contact
// @access  Private
router.delete('/:contactId', auth, emergencyContactsController.deleteEmergencyContact);

module.exports = router;
