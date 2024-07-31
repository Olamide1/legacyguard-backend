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
const DigitalWillSchema = new mongoose.Schema({
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
    default: 1,
  },
  previousVersions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WillVersion',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

DigitalWillSchema.index({ user: 1 });


module.exports = mongoose.model('DigitalWill', DigitalWillSchema);
