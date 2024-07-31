const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const digitalWillController = require('../controllers/digitalWillController');

// @route   POST api/wills
// @desc    Create a new digital will
// @access  Private
router.post('/', auth, digitalWillController.createWill);

// @route   GET api/wills
// @desc    Get all user's digital wills
// @access  Private
router.get('/', auth, digitalWillController.getWills);

// @route   PUT api/wills/:id
// @desc    Update a digital will
// @access  Private
router.put('/:id', auth, digitalWillController.updateWill);

// @route   DELETE api/wills/:id
// @desc    Delete a digital will
// @access  Private
router.delete('/:id', auth, digitalWillController.deleteWill);

// @route   GET api/wills/:id/versions
// @desc    Get all versions of a digital will
// @access  Private
router.get('/:id/versions', auth, digitalWillController.getWillVersions);

// @route   POST api/wills/:id/versions/:versionId/revert
// @desc    Revert to a previous version of a digital will
// @access  Private
router.post('/:id/versions/:versionId/revert', auth, digitalWillController.revertToVersion);

module.exports = router;
