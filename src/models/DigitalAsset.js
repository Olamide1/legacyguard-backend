const mongoose = require('mongoose');

const DigitalAssetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  value: {
    type: Number,
  },
  will: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DigitalWill',
  },
});

DigitalAssetSchema.index({ user: 1 });


module.exports = mongoose.model('DigitalAsset', DigitalAssetSchema);
