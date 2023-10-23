const { getPrices } = require("./getPrices.js");

exports.handler = async (event, context, callback) => {
  console.log("(+) event: \n" + JSON.stringify(event, null, 2));

  let message = "";
  let data = "";
  let body = "";
  let response = "";

  try {
    switch (event.httpMethod) {
      case "GET":
        message = "Hello from GET";
        // data = await getPrices();
        break;
      default:
        throw new Error(`Unsupported route: ${event.httpMethod}`);
    }

    if (data || message) {
      console.log("(+) data: \n" + data)

      response = {
        statusCode: 200,
        body: JSON.stringify(message)
      }

      return response;
    }
  } catch (error) {
    console.log(error);
  }
};