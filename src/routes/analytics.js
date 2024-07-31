const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const analyticsController = require('../controllers/analyticsController');

// @route   GET api/analytics
// @desc    Get analytics for user's digital estate
// @access  Private
router.get('/', auth, analyticsController.getAnalytics);

module.exports = router;
