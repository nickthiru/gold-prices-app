module.exports = async function sendEmail(sesClient, SendEmailCommand, emailTemplate) {

  try {
    const response = await sesClient.send(new SendEmailCommand(emailTemplate));

    console.log("(+) SendEmailCommand response: " + JSON.stringify(response, null, 2));

    return response;

  } catch (error) {
    console.log(error);
  };
}