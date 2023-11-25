const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const DbQuery = require("../../helper/db/db-query.js");

const ddbClient = new DynamoDBClient();


exports.handler = async (event, context, callback) => {
  console.log("(+) event: \n" + JSON.stringify(event, null, 2));

  const tableName = process.env.tableName;

  try {
    let data = "";

    switch (event.httpMethod) {

      case "GET":
        data = await DbQuery.latestPrices(ddbClient, tableName);
        break;

      default:
        throw new Error(`Unsupported route: ${event.httpMethod}`);
    }

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