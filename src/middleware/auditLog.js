const AuditLog = require('../models/AuditLog');

const logAction = async (user, action, details) => {
  try {
    await AuditLog.create({ user, action, details });
  } catch (err) {
    console.error('Failed to log action:', err.message);
  }
};

module.exports = logAction;
