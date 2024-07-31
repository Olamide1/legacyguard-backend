require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { startNotificationServices } = require('./services/notificationService');


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: 'Too many requests from this IP, please try again after 15 minutes.'
  });
  app.use(limiter);

// Log environment variables to ensure they are loaded
console.log('Mongo URI:', process.env.MONGO_URI);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/assets', require('./routes/digitalAssets'));
app.use('/api/wills', require('./routes/digitalWills'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/emergency-contacts', require('./routes/emergencyContacts'));
app.use('/api/audit-logs', require('./routes/auditLogs'));
app.use('/api/user', require('./routes/user'));




// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// Schedule reminders
startNotificationServices();
