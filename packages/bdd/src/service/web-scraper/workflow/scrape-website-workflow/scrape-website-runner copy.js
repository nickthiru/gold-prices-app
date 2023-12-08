const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");
const { SNSClient } = require("@aws-sdk/client-sns");

// const websites = require("./websites.js");

const websites = require("./websites.json");
console.log("websites: " + JSON.stringify(websites, null, 2));


const lambdaClient = new LambdaClient();
const snsClient = new SNSClient();


exports.handler = async function (event, context) {
  console.log("Inside 'scrape-website-runner' handler");
  console.log("event: \n" + JSON.stringify(event, null, 2));
  console.log("context: \n" + JSON.stringify(context, null, 2));


  /* Variables */

  const lambdaName = process.env.SCRAPE_WEBSITE_ACTION_LAMBDA_NAME;
  const outputEventTopicName = process.env.OUTPUT_EVENT_TOPIC_NAME;
  const outputEventTopicArn = process.env.OUTPUT_EVENT_TOPIC_ARN;

  console.log("outputEventTopicName: " + outputEventTopicName);
  console.log("outputEventTopicArn: " + outputEventTopicArn);


  // const websites = require("./websites.json");
  // console.log("websites: " + JSON.stringify(websites));

  // const websiteDetails = require(`./${siteName}/website-details.json`);

  const promises = websites.map(async (website) => {

    // const cleanerCb = require(`./${websiteDetails.siteName}/data-cleaner.js`);

    return await lambdaClient.send(new InvokeCommand({
      FunctionName: lambdaName,
      InvocationType: "RequestResponse",
      // LogType: "None" || "Tail",
      // Payload: JSON.stringify({
      //   websiteDetails,
      //   cleanerCb,
      // }),
      Payload: JSON.stringify(website),
    }));
  });

  const results = await Promise.all(promises)
  // console.log("results: " + JSON.stringify(results));


  results.forEach(async (result) => {
    const payload = Buffer.from(result.Payload).toString();
    console.log("Buffer.from(result.Payload).toString(): " + payload);

    // const { siteName, siteIsUpdated } = Buffer.from(result.Payload).toString();
    // console.log("Buffer.from(result.Payload).toString(): " + payload);

    // const logs = Buffer.from(LogResult, "base64").toString();

    // if (siteIsUpdated) {
    //   // Publish to 'WebsiteUpdated' SNS Topic
    //   await Util.publishToSns(snsClient, outputEventTopicArn, outputEventTopicName);
    // }
  });

  return {
    statusCode: 200,
    message: "Web scrape runner successfully completed"
  };
}