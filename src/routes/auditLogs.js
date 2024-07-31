const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const AuditLog = require('../models/AuditLog');

// @route   GET api/audit-logs
// @desc    Get audit logs for logged-in user
// @access  Private
router.get('/', auth, async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  try {
    const logs = await AuditLog.find({ user: req.user.id }).sort({ timestamp: -1 }).limit(limit);
    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
