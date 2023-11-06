const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { getPrices } = require("./get-prices.js");

const ddbClient = new DynamoDBClient();


exports.handler = async (event, context, callback) => {
  console.log("(+) event: \n" + JSON.stringify(event, null, 2));

  const tableName = process.env.tableName;

  let message = "";
  let data = "";
  // let body = "";
  let response = "";

  // addCorsHeader(event);

  try {
    switch (event.httpMethod) {
      case "GET":
        // message = "Hello from GET";
        data = await getPrices(ddbClient, tableName);
        break;
      default:
        throw new Error(`Unsupported route: ${event.httpMethod}`);
    }

    if (data || message) {
      console.log("(+) data: \n" + JSON.stringify(data, null, 2));
      console.log("(+) typeof data: \n" + typeof data);

      // response = {
      //   statusCode: 200,
      //   body: JSON.stringify(data)
      // };

      // return response;

      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*"
        },
        body: JSON.stringify(data)
      };
    }
  } catch (error) {
    console.log(error);
  }
};

// function addCorsHeader(arg) {
//   arg.headers["Access-Control-Allow-Origin"] = "*";
//   arg.headers["Access-Control-Allow-Methods"] = "*";
// }