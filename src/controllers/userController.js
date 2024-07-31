// controllers/userController.js
const User = require('../models/User');

exports.updateTrustedContacts = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { trustedContacts: req.body.trustedContacts });
    res.json({ msg: 'Trusted contacts updated' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateEmergencyAccessConditions = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { emergencyAccessConditions: req.body.emergencyAccessConditions });
    res.json({ msg: 'Emergency access conditions updated' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.checkOnboardingComplete = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const onboardingComplete = user.trustedContacts.length > 0 && user.emergencyAccessConditions.length > 0;
    res.json({ onboardingComplete });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};


exports.getTrustedContacts = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('trustedContacts');
      res.json(user.trustedContacts);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  };
  
  exports.getEmergencyAccessConditions = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('emergencyAccessConditions');
      res.json(user.emergencyAccessConditions);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  };