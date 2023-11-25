const populateEmailTemplate = require("./method/populate-email-template");
const sendEmail = require("./method/send-email");

// require("dotenv").config();

module.exports = EmailService = {
  sendEmail,
  populateEmailTemplate,
  // registerForEmailAlerts,
};