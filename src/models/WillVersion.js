const mongoose = require('mongoose');

const BeneficiarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  relationship: {
    type: String,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
});

const WillVersionSchema = new mongoose.Schema({
  willId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DigitalWill',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DigitalAsset',
  }],
  beneficiaries: [BeneficiarySchema],
  version: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('WillVersion', WillVersionSchema);
