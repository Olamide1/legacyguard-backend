const cron = require('node-cron');
const nodemailer = require('nodemailer');
const User = require('../models/User');  // Ensure the User model is imported

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendReminderEmail = (user, will) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: 'Will Reminder',
    text: `Dear ${user.fullName},\n\nThis is a reminder to review your will created on ${new Date(will.createdAt).toLocaleDateString()}.\n\nBest regards,\nEstate Management Team`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

const sendPulseCheckEmail = (user) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: 'Pulse Check',
    text: `Dear ${user.fullName},\n\nThis is a pulse check to ensure that your digital estate is up-to-date. Please log in to review and update your information as necessary.\n\nBest regards,\nEstate Management Team`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending pulse check email:', error);
    } else {
      console.log('Pulse check email sent:', info.response);
    }
  });
};

const scheduleReminders = () => {
  cron.schedule('0 9 * * *', async () => {  // Every day at 9 AM
    const users = await User.find().populate('wills');
    users.forEach(user => {
      user.wills.forEach(will => {
        sendReminderEmail(user, will);
      });
    });
  });
};

const schedulePulseChecks = () => {
  cron.schedule('0 9 1 */3 *', async () => {  // Every 3 months on the 1st at 9 AM
    const users = await User.find();
    users.forEach(user => {
      sendPulseCheckEmail(user);
    });
  });
};

const startNotificationServices = () => {
  scheduleReminders();
  schedulePulseChecks();
};

module.exports = { startNotificationServices };
