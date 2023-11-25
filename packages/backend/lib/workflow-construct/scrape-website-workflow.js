const { Construct } = require("constructs");
const { Duration } = require("aws-cdk-lib");
const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");
const { Runtime } = require("aws-cdk-lib/aws-lambda");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");
const { EventbridgeToLambda } = require("@aws-solutions-constructs/aws-eventbridge-lambda");
const { Schedule } = require("aws-cdk-lib/aws-events");
const path = require("path");

const packageLockJsonFile = "../../../../package-lock.json";

class WebScraper extends Construct {
  constructor(scope, id, props) {
    super(scope, id, props);

    const { siteName, tableArn, tableName } = props;

    console.log(`(+) Inside ${siteName} WebScraper construct`);

    // console.log("(+) tableArn: " + tableArn);
    // console.log("(+) tableName: " + tableName);

    const lambda = new NodejsFunction(this, "Lambda", {
      bundling: {
        externalModules: ["@aws-sdk"],
        nodeModules: ["@sparticuz/chromium"]
      },
      runtime: Runtime.NODEJS_18_X,
      memorySize: 1024,
      timeout: Duration.minutes(1),
      entry: (path.join(__dirname, `../../src/website/${siteName}/web-scraper-handler.js`)),
      handler: "handler",
      depsLockFilePath: (path.join(__dirname, packageLockJsonFile)),
      environment: { tableName }
    });

    lambda.addToRolePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [tableArn],
      actions: [
        "dynamodb:PutItem",
        "dynamodb:Query",
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

module.exports = { WebScraper };