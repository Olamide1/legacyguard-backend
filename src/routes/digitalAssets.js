const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const digitalAssetController = require('../controllers/digitalAssetController');

// @route   POST api/assets
// @desc    Add new digital asset
// @access  Private
router.post('/', auth, digitalAssetController.addAsset);

// @route   GET api/assets
// @desc    Get all user's digital assets
// @access  Private
router.get('/', auth, digitalAssetController.getAssets);

// @route   PUT api/assets/:id
// @desc    Update a digital asset
// @access  Private
router.put('/:id', auth, digitalAssetController.updateAsset);

// @route   DELETE api/assets/:id
// @desc    Delete a digital asset
// @access  Private
router.delete('/:id', auth, digitalAssetController.deleteAsset);

module.exports = router;
