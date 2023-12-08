const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");
const { SNSClient } = require("@aws-sdk/client-sns");

const Util = require("../../../util/service-object/util-service.js");


const lambdaClient = new LambdaClient();
const snsClient = new SNSClient();


exports.handler = async function (event, context) {
  console.log("Inside 'scrape-website-runner' handler");
  console.log("event: \n" + JSON.stringify(event, null, 2));
  console.log("context: \n" + JSON.stringify(context, null, 2));


  /* Variables */

  const scrapeWebsiteAction_LambdaNames = JSON.parse(process.env.SCRAPE_WEBSITE_ACTION_LAMBDA_NAMES);
  const outputEventTopicName = process.env.OUTPUT_EVENT_TOPIC_NAME;
  const outputEventTopicArn = process.env.OUTPUT_EVENT_TOPIC_ARN;
  console.log("scrapeWebsiteAction_LambdaNames: " + JSON.stringify(scrapeWebsiteAction_LambdaNames, null, 2));
  console.log("outputEventTopicName: " + outputEventTopicName);
  console.log("outputEventTopicArn: " + outputEventTopicArn);


  const promises = scrapeWebsiteAction_LambdaNames.map(async (lambdaName) => {

    return await lambdaClient.send(new InvokeCommand({
      FunctionName: lambdaName,
      InvocationType: "RequestResponse",
      // LogType: "None" || "Tail",
    }));
  });

  const results = await Promise.all(promises)
  // console.log("results: " + JSON.stringify(results));

  for (let i = 0; i < results.length; i++) {

    const { payload } = JSON.parse(Buffer.from(results[i].Payload).toString());
    console.log("payload.siteIsUpdated: " + payload.siteIsUpdated);

    if (payload.siteIsUpdated) {
      // Publish to 'WebsiteUpdated' SNS Topic
      await Util.publishToSns(snsClient, outputEventTopicArn, outputEventTopicName);
      break;
    }
  }

  return {
    statusCode: 200,
    message: "Web scrape runner successfully completed"
  };
}