const { SendBulkTemplatedEmailCommand } = require("@aws-sdk/client-ses");


module.exports = async function sendBulkEmail(sesClient, emailTemplateName, destinations, data) {
  console.log("(+) Inside 'sendBulkEmail()'");
  console.log("(+) emailTemplateName: " + emailTemplateName);
  console.log("(+) data: " + JSON.stringify(data, null, 2));
  console.log("(+) destinations: " + JSON.stringify(destinations, null, 2));
  console.log("(+) Array.isArray(destinations): " + Array.isArray(destinations));
  console.log("(+) typeof destinations[Symbol.iterator] === 'function': " + (typeof destinations[Symbol.iterator] === 'function'));


  try {
    const response = await sesClient.send(new SendBulkTemplatedEmailCommand({
      Source: "goldpricestracker@gmail.com",
      Template: emailTemplateName,
      DefaultTemplateData: JSON.stringify(data),
      Destinations: destinations,
    }));

    console.log("(+) SendBulkTemplatedEmailCommand response: " + JSON.stringify(response, null, 2));

    return response;

  } catch (error) {
    console.log(error);
  };
}