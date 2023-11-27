const { Construct } = require("constructs");
const { Duration } = require("aws-cdk-lib");
const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");
const { Runtime } = require("aws-cdk-lib/aws-lambda");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");
const { EventbridgeToLambda } = require("@aws-solutions-constructs/aws-eventbridge-lambda");
const { Schedule } = require("aws-cdk-lib/aws-events");

const path = require("path");


const packageLockJsonFilePath = "../../../../../../package-lock.json";

const workflowHandlerPath = "../../../../../bdd/src/service/web-scraper/workflow/scrape-website-workflow/scrape-website-workflow.js";


const domainWorkflow = {
  domain: "WebScraperService",
  workflow: {
    name: "ScrapeWebsite",
    description: ""
  },
  triggerEvent: {
    type: "EventBridge",
    description: "",
  },
  outputEvent: {
    name: "ScrapeWebsiteCompleted",
    description: "",
  }
};


class ScrapeWebsite extends Construct {
  constructor(scope, id, props) {
    super(scope, id, props);

    const { siteName, tableArn, tableName, outputEvent_Topic } = props;

    console.log(`(+) Inside ${siteName} ScrapeWebsite construct`);

    // console.log("(+) tableArn: " + tableArn);
    // console.log("(+) tableName: " + tableName);

    const lambda = new NodejsFunction(this, "Lambda", {
      bundling: {
        externalModules: ["@aws-sdk"],
        nodeModules: ["@sparticuz/chromium"]
      },
      runtime: Runtime.NODEJS_18_X,
      memorySize: 1024,
      timeout: Duration.minutes(5),
      entry: (path.join(__dirname, workflowHandlerPath)),
      handler: "handler",
      depsLockFilePath: (path.join(__dirname, packageLockJsonFilePath)),
      environment: {
        TABLE_NAME: tableName,
        WEBSITE_NAME: siteName,
        OUTPUT_EVENT_TOPIC_NAME: outputEvent_Topic.topicName,
        OUTPUT_EVENT_TOPIC_ARN: outputEvent_Topic.topicArn,
      },
      initialPolicy: [
        new PolicyStatement({
          effect: Effect.ALLOW,
          resources: [`arn:aws:sns:us-east-1:346761569124:${outputEvent_Topic.topicName}`],
          actions: ["sns:Publish"]
        })
      ]
    });

    lambda.addToRolePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [tableArn],
      actions: [
        "dynamodb:PutItem",
        // "dynamodb:Query",
        // "dynamodb:Scan",
        // "dynamodb:GetItem",
        // "dynamodb:UpdateItem",
        // "dynamodb:DeleteItem"
      ]
    }));

    // new EventbridgeToLambda(this, "EventbridgeToLambda", {
    //   existingLambdaObj: lambda,
    //   eventRuleProps: {
    //     schedule: Schedule.rate(Duration.minutes(15))
    //   }
    // });
  };
}

module.exports = { ScrapeWebsite };