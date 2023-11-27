/*
Check the 'event' object for group-level authorization. https://www.udemy.com/course/aws-typescript-cdk-serverless-react/learn/lecture/27148474

This is not related to this particular handler, but remember to register an "event" at the end of each task/function to SNS.
*/

// const { PublishCommand } = require("@aws-sdk/client-sns");


module.exports = async function publishToSns(snsClient, PublishCommand, topicArn, topicName) {
  console.log("Inside 'publish-to-sns' Util service method");
  console.log("topicArn: " + topicArn);
  console.log("message: " + message);

  try {
    var response = await snsClient.send(new PublishCommand({
      TopicArn: topicArn,
      Message: topicName,
    }));
    console.log("response: " + JSON.stringify(response));
    return response;
  } catch (err) {
    console.log(err);
  }
}