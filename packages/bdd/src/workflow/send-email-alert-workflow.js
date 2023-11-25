const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

const {
  populateEmailTemplate,
  sendEmail
} = require("../service/email/email-service.js");

const emailTemplate = require("../service/email/email-template/price-change-alert-email-template.js");

require("dotenv").config();


const sesConfig = {
  region: "us-east-1",
}

const sesClient = new SESClient(sesConfig);


exports.handler = async function (event) {

  // const subscriberEmails = get

  // const emailData = prepareEmailData(data);

  // const result = sendEmail(sesClient, SendEmailCommand, emailTemplate, emailData);

  // return {
  //   statusCode: 200,
  //   message: "Web scraper successfully completed"
  // };
};

// const populatedEmailTemplate = populateEmailTemplate(data, emailTemplate);
// const result = sendEmail(sesClient, SendEmailCommand, populatedEmailTemplate);