const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { SESClient } = require("@aws-sdk/client-ses");

const Email = require("../service-object/email-service.js");
const Db = require("../../db/service-object/db-service.js");

// require("dotenv").config();


const sesConfig = {
  region: "us-east-1",
}

const sesClient = new SESClient(sesConfig);
const ddbClient = new DynamoDBClient();


// const data = {
//   priceData: [
//     {
//       siteName: "Live Chennai",
//       uiDateTime: "uiDateTime",
//       goldPrice: "1234",
//     },
//     {
//       siteName: "Bhima",
//       uiDateTime: "uiDateTime",
//       goldPrice: "1234",
//     }, {
//       siteName: "Thangamayil",
//       uiDateTime: "uiDateTime",
//       goldPrice: "1234",
//     },
//   ]
// };


exports.handler = async function sendEmailAlertWorkflow(event, context) {
  console.log("Inside 'send-email-alert-workflow' handler");
  console.log("event: \n" + JSON.stringify(event, null, 2));
  console.log("context: \n" + JSON.stringify(context, null, 2));

  const tableName = process.env.TABLE_NAME;
  console.log("(+) tableName: " + tableName);

  const emailTemplateName = process.env.EMAIL_TEMPLATE_NAME;
  console.log("(+) emailTemplateName: " + emailTemplateName);


  try {
    const priceData = await Db.query.latestPrice(ddbClient, tableName);
    console.log("(+) data: " + JSON.stringify(priceData, null, 2));

    const data = { priceData };

    const emailAlertSubscribers = await Db.query.emailAlertSubscribers(ddbClient, tableName);

    const destinations = Email.prepareBulkEmailDestinations(emailAlertSubscribers);

    await Email.sendBulkEmail(sesClient, emailTemplateName, destinations, data);

    return {
      statusCode: 200,
      message: "send-email-alert-workflow successfully completed"
    };

  } catch (error) {
    console.log("(-) Error: " + error);
  }
};