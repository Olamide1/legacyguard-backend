const DigitalAsset = require('../models/DigitalAsset');
const logAction = require('../middleware/auditLog');

exports.addAsset = async (req, res) => {
  const { name, type, description, value } = req.body;
  try {
    const newAsset = new DigitalAsset({
      user: req.user.id,
      name,
      type,
      description,
      value,
    });

    const asset = await newAsset.save();
    res.json(asset);

    await logAction(req.user.id, 'ADD_ASSET', { assetId: asset.id, name });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getAssets = async (req, res) => {
  try {
    const assets = await DigitalAsset.find({ user: req.user.id });
    res.json(assets);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deleteAsset = async (req, res) => {
  try {
    const asset = await DigitalAsset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({ msg: 'Asset not found' });
    }

    if (asset.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await DigitalAsset.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Asset removed' });

    await logAction(req.user.id, 'DELETE_ASSET', { assetId: req.params.id });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateAsset = async (req, res) => {
  const { name, type, description, value } = req.body;
  try {
    let asset = await DigitalAsset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({ msg: 'Asset not found' });
    }

    if (asset.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    asset = await DigitalAsset.findByIdAndUpdate(
      req.params.id,
      { name, type, description, value },
      { new: true }
    );

    res.json(asset);

    await logAction(req.user.id, 'UPDATE_ASSET', { assetId: asset.id, name });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
