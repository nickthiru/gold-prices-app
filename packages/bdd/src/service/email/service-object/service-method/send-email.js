const { SendTemplatedEmailCommand } = require("@aws-sdk/client-ses");


module.exports = async function sendEmail(sesClient, emailTemplateName, emailAddress, data) {
  console.log("(+) Inside 'sendEmail()'");
  console.log("(+) emailTemplateName: " + emailTemplateName);
  console.log("(+) emailAddress: " + emailAddress);
  console.log("(+) data: " + JSON.stringify(data, null, 2));


  try {
    const response = await sesClient.send(new SendTemplatedEmailCommand({
      Source: "goldpricestracker@gmail.com",
      Destination: {
        ToAddresses: [
          emailAddress,
        ],
      },
      Template: emailTemplateName,
      TemplateData: JSON.stringify(data),
    }));

    console.log("(+) SendEmailCommand response: " + JSON.stringify(response, null, 2));

    return response;

  } catch (error) {
    console.log(error);
  };
}