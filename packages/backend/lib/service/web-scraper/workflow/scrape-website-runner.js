const { Construct } = require("constructs");
const { Duration } = require("aws-cdk-lib");
const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");
const { Runtime } = require("aws-cdk-lib/aws-lambda");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");
const { EventbridgeToLambda } = require("@aws-solutions-constructs/aws-eventbridge-lambda");
const { Schedule } = require("aws-cdk-lib/aws-events");

const path = require("path");


const packageLockJsonFilePath = "../../../../../../package-lock.json";

const workflowHandlerPath = "../../../../../bdd/src/service/web-scraper/workflow/scrape-website-workflow/scrape-website-runner.js";


class ScrapeWebsiteRunner extends Construct {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'ScrapeWebsiteRunner' construct");

    const { scrapeWebsiteAction_LambdaNames, outputEvent_Topic } = props;
    console.log("(+) scrapeWebsiteAction_LambdaNames: " + JSON.stringify(scrapeWebsiteAction_LambdaNames, null, 2));

    const lambda = new NodejsFunction(this, "Lambda", {
      bundling: {
        externalModules: ["@aws-sdk"],
      },
      runtime: Runtime.NODEJS_18_X,
      memorySize: 1024,
      timeout: Duration.minutes(5),
      entry: (path.join(__dirname, workflowHandlerPath)),
      handler: "handler",
      depsLockFilePath: (path.join(__dirname, packageLockJsonFilePath)),
      environment: {
        SCRAPE_WEBSITE_ACTION_LAMBDA_NAMES: JSON.stringify(scrapeWebsiteAction_LambdaNames),
        OUTPUT_EVENT_TOPIC_NAME: outputEvent_Topic.topicName,
        OUTPUT_EVENT_TOPIC_ARN: outputEvent_Topic.topicArn,
      },
      // initialPolicy: [
      //   new PolicyStatement({
      //     effect: Effect.ALLOW,
      //     // resources: [
      //     //   `arn:aws:sns:us-east-1:346761569124:function:${scrapeWebsiteAction_Lambda.functionName}`,
      //     // ],
      //     resources: [
      //       "*",
      //     ],
      //     actions: ["lambda:InvokeFunction"],
      //     // principals: ["arn:aws:sts::346761569124:assumed-role/*"],
      //   }),
      // ],
    });

    // lambda.addToRolePolicy(new PolicyStatement({
    //   effect: Effect.ALLOW,
    //   resources: [
    //     `arn:aws:sns:us-east-1:346761569124:function:${scrapeWebsiteAction_Lambda.functionName}`,
    //     "arn:aws:sts::346761569124:assumed-role/*"
    //   ],
    //   actions: ["lambda:InvokeFunction"],
    // }));

    lambda.addToRolePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [
        "*",
      ],
      actions: ["lambda:InvokeFunction"],
    }),);

    lambda.addToRolePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [`arn:aws:sns:us-east-1:346761569124:${outputEvent_Topic.topicName}`],
      actions: ["sns:Publish"],
    }));


    // new EventbridgeToLambda(this, "EventbridgeToLambda", {
    //   existingLambdaObj: lambda,
    //   eventRuleProps: {
    //     schedule: Schedule.rate(Duration.minutes(15))
    //   }
    // });
  };
}

module.exports = { ScrapeWebsiteRunner };