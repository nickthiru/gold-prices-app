const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");


const Db = require("../../db/service-object/db-service.js");


const ddbClient = new DynamoDBClient();


exports.handler = async function getLatestPriceWorkflow(event, context) {
  console.log("Inside 'get-latest-price-workflow' handler");
  console.log("event: \n" + JSON.stringify(event, null, 2));
  console.log("context: \n" + JSON.stringify(context, null, 2));

  const tableName = process.env.TABLE_NAME;

  try {
    const data = await Db.query.latestPrice(ddbClient, tableName);

    // The following 'if' statement is currently coupled to the single
    // API endpoint above. If the data prep is different for each endpoint,
    // then move the 'if' block to the relevant methods themselves, instead
    // of having it/them here.
    if (data) {
      console.log("(+) data: \n" + JSON.stringify(data, null, 2));
      console.log("(+) typeof data: \n" + typeof data);

      const body = JSON.stringify(data);

      const response = {
        statusCode: 200,
        // Add CORS header
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*"
        },
        body: body,
      };

      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

// function addCorsHeader(arg) {
//   arg.headers["Access-Control-Allow-Origin"] = "*";
//   arg.headers["Access-Control-Allow-Methods"] = "*";
// }