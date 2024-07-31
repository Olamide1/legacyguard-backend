const DigitalWill = require('../models/DigitalWill');
const WillVersion = require('../models/WillVersion');

const logAction = require('../middleware/auditLog');

exports.createWill = async (req, res) => {
    const { assets, beneficiaries } = req.body;
    try {
      const newWill = new DigitalWill({
        user: req.user.id,
        assets,
        beneficiaries,
      });
  
      const will = await newWill.save();
      res.json(will);
  
      await logAction(req.user.id, 'CREATE_WILL', { willId: will.id });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  };
  
  exports.getWills = async (req, res) => {
    try {
      const wills = await DigitalWill.find({ user: req.user.id }).populate('assets');
      res.json(wills);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  };
  
  exports.deleteWill = async (req, res) => {
    try {
      const will = await DigitalWill.findById(req.params.id);
  
      if (!will) {
        return res.status(404).json({ msg: 'Will not found' });
      }
  
      if (will.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      await DigitalWill.findByIdAndDelete(req.params.id);
      res.json({ msg: 'Will removed' });
  
      await logAction(req.user.id, 'DELETE_WILL', { willId: req.params.id });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  };
  
  exports.updateWill = async (req, res) => {
    const { assets, beneficiaries } = req.body;
    try {
      let will = await DigitalWill.findById(req.params.id);
  
      if (!will) {
        return res.status(404).json({ msg: 'Will not found' });
      }
  
      if (will.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      // Save current version as a new WillVersion
      const willVersion = new WillVersion({
        willId: will._id,
        user: will.user,
        assets: will.assets,
        beneficiaries: will.beneficiaries,
        version: will.version,
      });
      await willVersion.save();
  
      // Update the will
      will.assets = assets;
      will.beneficiaries = beneficiaries;
      will.version += 1;
      will.previousVersions.push(willVersion._id);
      will.updatedAt = Date.now();
  
      await will.save();
  
      res.json(will);
  
      await logAction(req.user.id, 'UPDATE_WILL', { willId: will.id });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  };
  
  exports.getWillVersions = async (req, res) => {
    try {
      const willVersions = await WillVersion.find({ willId: req.params.id }).sort({ version: -1 });
      res.json(willVersions);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  };
  
  exports.revertToVersion = async (req, res) => {
    try {
      const willVersion = await WillVersion.findById(req.params.versionId);
      if (!willVersion) {
        return res.status(404).json({ msg: 'Version not found' });
      }
  
      const will = await DigitalWill.findById(willVersion.willId);
      if (!will) {
        return res.status(404).json({ msg: 'Will not found' });
      }
  
      if (will.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      // Revert to the selected version
      will.assets = willVersion.assets;
      will.beneficiaries = willVersion.beneficiaries;
      will.version = will.version + 1;
      will.updatedAt = Date.now();
  
      await will.save();
  
      await logAction(req.user.id, 'REVERT_WILL_VERSION', { willId: will.id, versionId: willVersion._id });
  
      res.json({ data: will }); // Ensure the response contains a 'data' property
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  };
  