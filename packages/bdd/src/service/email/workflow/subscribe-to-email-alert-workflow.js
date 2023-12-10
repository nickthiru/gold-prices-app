const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const Db = require("../../db/service-object/db-service.js");


const ddbClient = new DynamoDBClient();


exports.handler = async function subscribeToEmailAlertWorkflow(event, context) {
  console.log("Inside 'subscribe-to-email-alert-workflow' handler");
  console.log("event: \n" + JSON.stringify(event, null, 2));
  console.log("context: \n" + JSON.stringify(context, null, 2));


  const tableName = process.env.TABLE_NAME;
  console.log("tableName: " + tableName);

  const requestBody = JSON.parse(event.body);
  console.log("(+) requestBody: \n" + JSON.stringify(requestBody, null, 2));

  const emailAddress = requestBody.emailAddress;

  const dataToSave = {
    PK: "EMAIL_ALERT",
    SK: `EMAIL_ALERT#${emailAddress}`,
    emailAddress: emailAddress
  };
  console.log("(+) dataToSave: \n" + JSON.stringify(dataToSave, null, 2));

  const result = await Db.item.saveItem(ddbClient, tableName, dataToSave);

  return {
    statusCode: 200,
    message: "subscribe-to-email-alert-workflow successfully completed"
  };
}