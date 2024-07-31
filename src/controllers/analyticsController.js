const DigitalAsset = require('../models/DigitalAsset');
const DigitalWill = require('../models/DigitalWill');

exports.getAnalytics = async (req, res) => {
  try {
    const assets = await DigitalAsset.find({ user: req.user.id });
    const wills = await DigitalWill.find({ user: req.user.id });

    const totalAssetValue = assets.reduce((total, asset) => total + asset.value, 0);
    const willCount = wills.length;

    res.json({
      totalAssetValue,
      willCount
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
