const prepareBulkEmailDestinations = require("./service-method/prepare-bulk-email-destinations");
const sendBulkEmail = require("./service-method/send-bulk-email");
const sendEmail = require("./service-method/send-email");


module.exports = {
  sendEmail,
  sendBulkEmail,
  prepareBulkEmailDestinations,
};