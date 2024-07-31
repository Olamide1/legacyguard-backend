// models/User.js
const mongoose = require('mongoose');

const TrustedContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  relationship: {
    type: String,
    required: true,
  },
  phoneNumber: String,
});

const EmergencyAccessConditionSchema = new mongoose.Schema({
  condition: String,
  value: String,
});

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  twoFactorEnabled: {
    type: Boolean,
    default: false,
  },
  twoFactorSecret: {
    type: String,
  },
  emergencyContacts: [{
    name: String,
    phoneNumber: String,
    relationship: String,
  }],
  digitalAssets: [{
    type: String,
    description: String,
    value: Number,
  }],
  beneficiaries: [{
    name: String,
    relationship: String,
    percentage: Number,
  }],
  trustedContacts: [TrustedContactSchema],
  emergencyAccessConditions: [EmergencyAccessConditionSchema],
  emergencyContacts: [{
    name: String,
    phoneNumber: String,
    relationship: String,
  }],
});

UserSchema.index({ email: 1 });

module.exports = mongoose.model('User', UserSchema);
