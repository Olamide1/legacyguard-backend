const User = require('../models/User');

exports.addEmergencyContact = async (req, res) => {
  const { name, phoneNumber, relationship } = req.body;
  try {
    const user = await User.findById(req.user.id);
    user.emergencyContacts.push({ name, phoneNumber, relationship });
    await user.save();
    res.json(user.emergencyContacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getEmergencyContacts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.emergencyContacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deleteEmergencyContact = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.emergencyContacts = user.emergencyContacts.filter(contact => contact._id.toString() !== req.params.contactId);
    await user.save();
    res.json(user.emergencyContacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
